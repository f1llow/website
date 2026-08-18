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

const PRODUCTS = {
  '1': { name: 'IP-камера HiWatch DS-I400(D) (2.8 мм)', price: 6899, discount: 0 },
  '2': { name: 'IP-камера Tiandy TC-C34XN I3W/E/Y/2.8mm/V4.2', price: 3599, discount: 0 },
  '3': { name: 'Аналоговая камера HiWatch DS-T133 (2.8 mm)', price: 4500, discount: 0 },
  '4': { name: 'Внешнее хранилище Wisenet SRB-160S', price: 25000, discount: 0 },
  '6': { name: 'IP-камера Xiaomi Smart Camera C200', price: 9800, discount: 15 },
  '7': { name: 'Кабель ORIENT CVAP-30', price: 699, discount: 0 },
  '8': { name: 'Блок питания ORIENT SAP-2405', price: 1299, discount: 0 },
  '9': { name: 'Блок питания Rexant 34-0495', price: 1799, discount: 0 },
  '10': { name: 'Кабель Rexant 01-4014', price: 8399, discount: 0 },
  '11': { name: 'Аналоговая камера Falcon Eye FE-MHD-BP2e-20', price: 2100, discount: 0 }
};

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
  if (value == null) return null;
  if (typeof value !== 'string' || value.length > maxLength) return null;
  const trimmed = value.trim();
  return trimmed || null;
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
      const productId = String(item?.productId ?? item?.product?.id ?? '');
      const quantity = Number(item?.quantity);
      const product = PRODUCTS[productId];

      if (!product || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 999) {
        throw new Error('Invalid cart item');
      }

      const price = Math.round(product.price * (1 - product.discount / 100));
      return { productId, productName: product.name, price, quantity };
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
      }
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
      const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
      });

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
    res.status(500).json({ success: false, message: 'Не удалось оформить заказ' });
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
