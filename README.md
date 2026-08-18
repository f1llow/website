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

### Frontend

Установить зависимости из корня проекта:

```bash
npm install
```

При необходимости можно указать адрес backend в `.env`:

```env
VITE_API_URL=http://localhost:3001
```

Если переменная не указана, frontend использует настроенный адрес backend.

Запустить:

```bash
npm run dev
```

### Backend

Перейти в папку сервера и установить зависимости:

```bash
cd server
npm install
```

Создать файл `.env`:

```env
PORT=3001
DATABASE_URL="file:../prisma/dev.db"
TELEGRAM_BOT_TOKEN="..."
TELEGRAM_CHAT_ID="..."
ADMIN_STATS_TOKEN="..."
FRONTEND_ORIGIN="http://localhost:5173"
```

Применить миграции и сгенерировать Prisma Client:

```bash
npx prisma migrate deploy --schema ../prisma/schema.prisma
npx prisma generate --schema ../prisma/schema.prisma
```

Запустить сервер:

```bash
node index.js
```

## Зачем этот проект

Хотел сделать не просто статичный сайт, а полноценное приложение с frontend и backend, где можно посмотреть товары, собрать корзину и оформить заказ.

В процессе разработки разбирался с React, TypeScript, Express, Prisma, базой данных, API и интеграцией с Telegram.

## Деплой

Frontend — Netlify.

Backend — Render.

Секретные данные хранятся в переменных окружения и не добавляются в репозиторий.
