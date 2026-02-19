# Advanced Todo

Современное приложение для управления задачами с возможностями планирования и добавления тегов. Построено на базе Next.js и Prisma.

## Стек

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Styling:** Tailwind CSS v4
- **UI Icons:** Lucide React
- **Date Handling:** Day.js

## Начало работы

### Требования

- Node.js 20+
- PostgreSQL
- npm, yarn, pnpm или bun

### Установка

1. Установите зависимости:

```bash
npm install
```

2. Настройте подключение к базе данных, указав переменную окружения `DATABASE_URL` в файле `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/advanced-todo"
```

3. Примените миграции базы данных:

```bash
npx prisma migrate dev
```

4. (Опционально) Заполните базу данных тестовыми данными:

```bash
npm run db:seed
```

5. Запустите сервер разработки:

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Доступные команды

- `npm run dev` — запуск сервера разработки
- `npm run build` — сборка для продакшена
- `npm run start` — запуск продакшен-сервера
- `npm run lint` — запуск ESLint
- `npm run db:seed` — заполнение базы данных
- `npm run db:reset` — сброс базы данных
