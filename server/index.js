const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn('Telegram credentials are not configured.');
}

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'https://specvideo.netlify.app'
}));
app.use(express.json());

const orders = [];

app.post('/api/order', async (req, res) => {
  const { name, phone, email, address, comment, cart } = req.body;

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ success: false, message: 'Корзина пуста' });
  }

  const total = cart.reduce((sum, item) => {
    const price = item.product.discount
      ? Math.round(item.product.price * (1 - item.product.discount / 100))
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const order = {
    id: Date.now(),
    name,
    phone,
    email,
    address,
    comment,
    items: cart,
    total,
    date: new Date().toISOString()
  };

  orders.push(order);

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(503).json({
      success: false,
      message: 'Сервис уведомлений не настроен'
    });
  }

  const orderItems = cart
    .map(item => `• ${item.product.name} x${item.quantity} — ${item.product.price}₽`)
    .join('\n');

  const message = `
🛒 *Новый заказ!*

👤 Имя: ${name}
📞 Телефон: ${phone}
📧 Email: ${email || 'не указано'}
🏠 Адрес: ${address}
💬 Комментарий: ${comment || 'нет'}

📦 Заказ:
${orderItems}

💰 Итого: ${total} ₽
`;

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );

    if (!telegramResponse.ok) {
      throw new Error(`Telegram API returned ${telegramResponse.status}`);
    }

    res.status(200).json({ success: true, orderId: order.id });
  } catch (err) {
    console.error('Ошибка при отправке в Telegram:', err);
    res.status(500).json({ success: false, message: 'Ошибка отправки в Telegram' });
  }
});

app.get('/api/stats', (req, res) => {
  const now = new Date();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgCheck = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  const today = orders.filter(order => {
    const date = new Date(order.date);
    return date.toDateString() === now.toDateString();
  });

  const last7Days = orders.filter(order => {
    const date = new Date(order.date);
    return now - date <= 7 * 24 * 60 * 60 * 1000;
  });

  const currentMonth = orders.filter(order => {
    const date = new Date(order.date);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  res.json({
    totalOrders,
    totalRevenue,
    avgCheck,
    today: {
      orders: today.length,
      revenue: today.reduce((sum, o) => sum + o.total, 0)
    },
    week: {
      orders: last7Days.length,
      revenue: last7Days.reduce((sum, o) => sum + o.total, 0)
    },
    month: {
      orders: currentMonth.length,
      revenue: currentMonth.reduce((sum, o) => sum + o.total, 0)
    }
  });
});

app.listen(PORT, () => {
  console.log(`🟢 Сервер запущен на порту ${PORT}`);
});
