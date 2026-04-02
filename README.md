# NEWSPORTAL

Веб-портал для публикации новостей и статей, созданный на стеке MERN.

`MongoDB` `Express` `React` `Node.js` `Vite` `JWT`

---

Минималистичный дизайн. Чёткое разграничение ролей.

Полнофункциональная новостная платформа с системой ролей — журналист публикует материалы, читатель комментирует.

---

✦ Что это?

NEWSPORTAL — это веб-портал для публикации новостей и статей.
Журналисты создают, редактируют и удаляют материалы.
Читатели просматривают статьи и оставляют комментарии.

Всё взаимосвязано: фронтенд на React → REST API на Express → MongoDB Atlas.

---

✦ Архитектура
```
  Читатель / Журналист
         │
         ▼
    React (Vite)
         │
    React Router
         │
    Express REST API
         │
    MongoDB Atlas
      (Mongoose)
```

---

✦ Технологический стек

| Слой | Технологии |
|------|-----------|
| Фронтенд | React 18, Vite, React Router v6 |
| Бэкенд | Node.js, Express |
| База данных | MongoDB Atlas, Mongoose |
| Авторизация | JWT, bcryptjs |
| HTTP-клиент | Axios |

---

✦ Роли пользователей

| Роль | Возможности |
|------|------------|
| 📰 Журналист | Создавать, редактировать, удалять статьи |
| 👤 Читатель | Просматривать статьи, оставлять комментарии |

---

✦ Функциональность

**Авторизация**
- Регистрация с выбором роли
- Вход с JWT-токеном (срок действия 7 дней)
- Защищённые маршруты по роли

**Статьи**
- Список всех статей на главной
- Страница отдельной статьи
- Создание, редактирование, удаление (только журналист)

**Комментарии**
- Просмотр комментариев без входа
- Оставить комментарий (только авторизованный пользователь)

---

✦ REST API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| POST | /api/auth/register | Регистрация |
| POST | /api/auth/login | Вход |
| GET | /api/posts | Все статьи |
| GET | /api/posts/:id | Одна статья |
| POST | /api/posts | Создать статью (журналист) |
| PUT | /api/posts/:id | Редактировать статью (журналист) |
| DELETE | /api/posts/:id | Удалить статью (журналист) |
| GET | /api/comments/:postId | Комментарии к статье |
| POST | /api/comments/:postId | Добавить комментарий |

---

✦ Структура проекта
```
newsportal/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Article.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── CreatePost.jsx
│   │   └── EditPost.jsx
│   ├── services/
│   │   └── api.js
│   └── App.jsx
└── server/
    ├── models/
    │   ├── User.js
    │   ├── Post.js
    │   └── Comment.js
    ├── routes/
    │   ├── auth.js
    │   ├── posts.js
    │   └── comments.js
    ├── middleware/
    │   └── auth.js
    └── index.js
```

---

✦ Запуск проекта

**Требования**
- Node.js 18+
- Аккаунт MongoDB Atlas

**1. Клонировать репозиторий**
```bash
git clone https://github.com/santoclumb/newscoursework.git
cd newscoursework
```

**2. Запустить фронтенд**
```bash
npm install
npm run dev
```

**3. Запустить бэкенд**
```bash
cd server
npm install
node index.js
```

Вы должны увидеть:
```
MongoDB подключена
Сервер запущен на порту 5000
```

**4. Открыть в браузере**
```
http://localhost:5173
```

---

✦ Переменные окружения

Создать `server/.env`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```
