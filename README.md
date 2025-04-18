# 🌐 Social Media App

A full-featured **Social Media Application** built with the **MERN Stack (MongoDB, Express, React, Node.js)** and powered with modern tools like **Redux Toolkit**, **Socket.IO**, **Cloudinary**, and more.

This app allows users to interact through posts, likes, comments, notifications, and profile management — all in a responsive and real-time experience.

---

## 📸 Demo

> A live demo will be available soon...

---

## ✨ Features

### 👤 Authentication

- JWT-based Sign up / Sign in
- Form validation using Formik & Yup
- Protected routes & auto-login with stored token

### 📄 Posts

- Create, edit, delete posts
- Upload images (Base64 or Cloudinary)
- Rich text support
- Show time like “2h ago”

### ❤️ Interactions

- Like / Unlike posts
- Add / Delete comments
- Real-time update on new interactions (via Socket.IO)

### 🔔 Notifications

- Real-time notifications
- Seen/unseen status
- "Mark all as seen" functionality

### 👥 Users

- Follow / Unfollow system
- View other user profiles
- Search for users by name
- Display user stats (followers, posts, etc.)

### 🌙 UI/UX

- Fully responsive (Mobile & Desktop)
- Toggle between dark/light theme (optional)
- Modern look with TailwindCSS + DaisyUI

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Redux Toolkit & RTK Query
- React Router DOM
- Tailwind CSS / DaisyUI
- Axios
- Formik & Yup
- Lucide Icons

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.IO
- Multer / Cloudinary / Base64
- Bcrypt / JWT
- CORS / Helmet

---

## 📁 Folder Structure

social-media-app/ ├── client/ # React frontend │ ├── src/ │ │ ├── components/ # Reusable UI components │ │ ├── features/ # Redux slices & logic │ │ ├── pages/ # App pages (home, profile, post, login) │ │ ├── api/ # RTK Query endpoints │ │ ├── utils/ # Helper functions (formatDate, auth check) │ │ └── App.jsx ├── server/ # Express backend │ ├── controllers/ # Route logic │ ├── models/ # Mongoose schemas │ ├── routes/ # API routes │ ├── middleware/ # JWT auth, error handlers │ ├── utils/ # Socket, image, etc. │ └── server.js

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/social-media-app.git
cd social-media-app
```

# Start server

cd server
npm run dev

# Start client

cd ../client
npm run dev
