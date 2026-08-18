# СпецВидеоТехника

Мой full-stack проект интернет-магазина оборудования для видеонаблюдения и безопасности.

Сайт сделан для ООО «СПЕЦВИДЕОТЕХНИКА»: каталог товаров и услуг, корзина, оформление заказа и уведомления о новых заказах в Telegram.

## Что использовал

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express
- Prisma
- SQLite
- Telegram Bot API

## Что реализовано

- каталог товаров и услуг;
- страницы товаров;
- корзина;
- оформление заказа;
- сохранение заказов в базе данных;
- Telegram-уведомления о новых заказах;
- статистика заказов;
- API health-check;
- валидация данных на backend;
- защита административной статистики.

## Структура проекта

```text
src/                 # frontend на React + TypeScript
server/              # Express API
prisma/              # Prisma schema и миграции
public/              # изображения и другие статические файлы
```

## Запуск локально

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

Перед запуском backend нужно создать `.env`:

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

## Зачем делал проект

Основная задача проекта — сделать полноценный сайт для реального бизнеса, а не просто учебный интернет-магазин. Поэтому здесь есть отдельный frontend, backend, база данных, оформление заказов и интеграция с Telegram.

В процессе разработки отдельно занимался структурой проекта, API, работой с Prisma, обработкой заказов и базовыми вопросами безопасности.

## Деплой

Frontend развёрнут на Netlify, backend — на Render.

Секретные данные и токены не хранятся в репозитории и передаются через переменные окружения.
