const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ADMIN_STATS_TOKEN = process.env.ADMIN_STATS_TOKEN;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://specvideo.netlify.app';

app.disable('x-powered-by');
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json({ limit: '100kb' }));

const requiredString = (value, field, maxLength = 500) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }
  if (value.length > maxLength) {
    throw new Error(`${field} is too long`);
  }
  return value.trim();
};

const optionalString = (value, maxLength = 1000) => {
  if (value == null || value === '') return null;
  if (typeof value !== 'string' || value.length > maxLength) return null;
  return value.trim();
};

app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({ status: 'error' });
  }
});

app.post('/api/order', async (req, res) => {
  try {
    const { name, phone, email, address, comment, cart } = req.body;

    const customerName = requiredString(name, 'name', 100);
    const customerPhone = requiredString(phone, 'phone', 50);
    const customerAddress = requiredString(address, 'address', 500);
    const customerEmail = optionalString(email, 254);
    const customerComment = optionalString(comment, 1000);

    if (!Array.isArray(cart) || cart.length === 0 || cart.length > 100) {
      return res.status(400).json({ success: false, message: 'Некорректная корзина' });
    }

    const items = cart.map((item) => {
      const product = item?.product;
      const quantity = Number(item?.quantity);
      const price = Number(product?.price);
      const discount = Number(product?.discount || 0);

      if (!product?.name || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 999) {
        throw new Error('Invalid cart item');
      }
      if (!Number.isFinite(price) || price < 0 || !Number.isFinite(discount) || discount < 0 || discount > 100) {
        throw new Error('Invalid product price');
      }

      const finalPrice = Math.round(price * (1 - discount / 100));
      return {
        productId: String(product.id ?? product.name).slice(0, 100),
        productName: String(product.name).slice(0, 300),
        price: finalPrice,
        quantity
      };
    });

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        address: customerAddress,
        comment: customerComment,
        total,
        items: { create: items }
      },
      include: { items: true }
    });

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('Order saved, but Telegram credentials are not configured.');
      return res.status(201).json({ success: true, orderId: order.id, notificationSent: false });
    }

    const orderItems = items
      .map((item) => `• ${item.productName} x${item.quantity} — ${item.price}₽`)
      .join('\n');

    const message = [
      '🛒 Новый заказ!',
      '',
      `👤 Имя: ${customerName}`,
      `📞 Телефон: ${customerPhone}`,
      `📧 Email: ${customerEmail || 'не указано'}`,
      `🏠 Адрес: ${customerAddress}`,
      `💬 Комментарий: ${customerComment || 'нет'}`,
      '',
      '📦 Заказ:',
      orderItems,
      '',
      `💰 Итого: ${total} ₽`,
      `🆔 Заказ №${order.id}`
    ].join('\n');

    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
        }
      );

      if (!telegramResponse.ok) {
        throw new Error(`Telegram API returned ${telegramResponse.status}`);
      }

      return res.status(201).json({ success: true, orderId: order.id, notificationSent: true });
    } catch (error) {
      console.error('Telegram notification failed:', error);
      return res.status(201).json({ success: true, orderId: order.id, notificationSent: false });
    }
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(400).json({ success: false, message: 'Не удалось оформить заказ' });
  }
});

app.get('/api/stats', async (req, res) => {
  if (!ADMIN_STATS_TOKEN || req.get('Authorization') !== `Bearer ${ADMIN_STATS_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - 6);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalOrders, revenue, today, week, month] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.aggregate({ where: { createdAt: { gte: startOfToday } }, _count: true, _sum: { total: true } }),
      prisma.order.aggregate({ where: { createdAt: { gte: startOfWeek } }, _count: true, _sum: { total: true } }),
      prisma.order.aggregate({ where: { createdAt: { gte: startOfMonth } }, _count: true, _sum: { total: true } })
    ]);

    const totalRevenue = revenue._sum.total || 0;

    res.json({
      totalOrders,
      totalRevenue,
      avgCheck: totalOrders ? Number((totalRevenue / totalOrders).toFixed(2)) : 0,
      today: { orders: today._count, revenue: today._sum.total || 0 },
      week: { orders: week._count, revenue: week._sum.total || 0 },
      month: { orders: month._count, revenue: month._sum.total || 0 }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Не удалось получить статистику' });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

const server = app.listen(PORT, () => {
  console.log(`🟢 Сервер запущен на порту ${PORT}`);
});

const shutdown = async (signal) => {
  console.log(`${signal}: shutting down...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
