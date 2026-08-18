# СпецВидеоТехника

Full-stack интернет-магазин оборудования для видеонаблюдения и безопасности.

## Стек

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express 5
- Prisma
- SQLite
- Telegram Bot API

## Возможности

- каталог товаров и услуг;
- карточки товаров;
- корзина;
- оформление заказа;
- сохранение заказов в базе данных;
- Telegram-уведомления о новых заказах;
- защищённая статистика заказов;
- health-check API.

## Структура

```text
.
├── src/                 # React frontend
├── server/              # Express API
├── prisma/              # Prisma schema and migrations
├── public/              # Static assets
└── package.json
```

## Локальный запуск

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
node index.js
```

Перед запуском backend задайте переменные окружения:

```env
PORT=3001
DATABASE_URL="file:../prisma/dev.db"
TELEGRAM_BOT_TOKEN="..."
TELEGRAM_CHAT_ID="..."
ADMIN_STATS_TOKEN="..."
FRONTEND_ORIGIN="http://localhost:5173"
```

Для применения миграций из корня проекта:

```bash
npx prisma migrate deploy
npx prisma generate
```

## Безопасность

Секреты не хранятся в Git. Никогда не коммитьте `.env` и токены Telegram.

Если токен Telegram когда-либо попадал в публичную историю Git, его необходимо перевыпустить у BotFather.
