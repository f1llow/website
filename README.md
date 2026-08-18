# СпецВидеоТехника

Мой full-stack проект сайта для компании «СпецВидеоТехника».

Сделал интернет-магазин оборудования для видеонаблюдения и безопасности с каталогом товаров и услуг, корзиной и оформлением заказа. Заказы сохраняются в базе, а информация о новом заказе приходит в Telegram.

## Стек

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Node.js
- Express
- Prisma
- SQLite
- Telegram Bot API

## Что сделал

- собрал frontend на React + TypeScript;
- сделал каталог товаров и услуг;
- добавил страницы товаров;
- реализовал корзину;
- сделал оформление заказа;
- подключил backend на Express;
- добавил сохранение заказов через Prisma;
- добавил Telegram-уведомления о новых заказах;
- сделал API для статистики заказов;
- добавил health-check;
- добавил валидацию данных;
- сделал расчёт цены заказа на backend, чтобы клиент не мог просто изменить цену товара в запросе;
- добавил защиту административной статистики.

## Структура

```text
src/                 # frontend
server/              # backend и API
prisma/              # база данных, schema и миграции
```

## Запуск

Установить зависимости:

```bash
npm install
```

Запустить frontend:

```bash
npm run dev
```

Backend запускается отдельно:

```bash
cd server
npm install
node index.js
```

Для backend нужны переменные окружения:

```env
PORT=3001
DATABASE_URL="file:../prisma/dev.db"
TELEGRAM_BOT_TOKEN="..."
TELEGRAM_CHAT_ID="..."
ADMIN_STATS_TOKEN="..."
FRONTEND_ORIGIN="http://localhost:5173"
```

Применить миграции Prisma:

```bash
npx prisma migrate deploy
npx prisma generate
```

## Зачем этот проект

Хотел сделать не просто статичный сайт, а полноценное приложение с frontend и backend, где можно посмотреть товары, собрать корзину и оформить заказ.

В процессе разработки разбирался с React, TypeScript, Express, Prisma, базой данных, API и интеграцией с Telegram.

## Деплой

Frontend — Netlify.

Backend — Render.

Секретные данные хранятся в переменных окружения и не добавляются в репозиторий.
