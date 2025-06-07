const TelegramBot = require('node-telegram-bot-api');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const BOT_TOKEN = '8041409349:AAHjBVKwG0jytcEQIJAHMnOLLNQ-TZg7iIo';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Показываем кнопки при /start или /menu
bot.onText(/\/start|\/menu/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Выберите действие:', {
    reply_markup: {
      keyboard: [
        ['📊 Статистика', '🔄 Обновить'],
        ['🛑 Скрыть меню']
      ],
      resize_keyboard: true, // подогнать размер
      one_time_keyboard: false // оставить клавиатуру на экране
    }
  });
});

// Обрабатываем нажатие на кнопки
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

 if (text === '📊 Статистика') {
  try {
    const response = await fetch('http://localhost:3001/api/stats');
    const stats = await response.json();

    const reply = `📊 *Статистика заказов:*\n
Всего заказов: ${stats.totalOrders}
Общий доход: ${stats.totalRevenue} ₽
Средний чек: ${stats.avgCheck} ₽

 *Сегодня:* ${stats.today.orders} заказов на ${stats.today.revenue} ₽
 *7 дней:* ${stats.week.orders} заказов на ${stats.week.revenue} ₽
 *Месяц:* ${stats.month.orders} заказов на ${stats.month.revenue} ₽`;

    bot.sendMessage(chatId, reply, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('Ошибка /stats:', err);
    bot.sendMessage(chatId, '❌ Не удалось получить статистику.');
  }
}


  if (text === '🔄 Обновить') {
    bot.sendMessage(chatId, '✅ Обновлено.');
  }

  if (text === '🛑 Скрыть меню') {
    bot.sendMessage(chatId, 'Меню скрыто.', {
      reply_markup: {
        remove_keyboard: true
      }
    });
  }
});
