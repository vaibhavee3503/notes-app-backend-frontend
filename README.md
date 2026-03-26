# 🚀 Notes App (Full Stack)

## 📌 Overview

This project is a full-stack Notes Application built as part of a Backend Developer Intern assignment. It demonstrates secure, scalable backend development along with a simple frontend interface.

---

## ✨ Features

### 🔐 Authentication

* User Registration & Login
* Password hashing (bcrypt)
* JWT-based authentication

### 🧑‍💻 Role-Based Structure

* Basic structure for user/admin roles (extendable)

### 📝 Notes Management (CRUD)

* Create notes
* View notes
* Delete notes

### 🌐 Frontend

* Built with React.js
* Login & Register UI
* Dashboard for managing notes
* Custom success/error notifications

---

## 🛠️ Tech Stack

### Backend

* FastAPI (Python)
* SQLAlchemy (ORM)
* SQLite (Database)
* JWT (Authentication)

### Frontend

* React.js
* Fetch API

---

## ⚙️ Project Structure

```
project/
 ├── backend/
 │   ├── app/
 │   ├── venv/
 │
 └── frontend/
```

---

## 🚀 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

👉 API Docs:
http://127.0.0.1:8000/docs

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

👉 Runs on:
http://localhost:3000

---

## 🔐 Authentication Flow

1. Register user
2. Login → get JWT token
3. Use token to access protected routes

---

## 📦 API Endpoints

### Auth

* POST `/register`
* POST `/login`

### Notes

* POST `/notes`
* GET `/notes`
* DELETE `/notes/{id}`

---

## ⚠️ Error Handling

* Proper status codes (400, 401, 500)
* Input validation
* Secure token verification

---

## 📈 Scalability Notes

* Modular backend structure
* Can be extended to microservices
* Redis can be added for caching
* Docker support can be added
* Load balancing for scaling

---

---

## ✨ Features

### 🔐 Authentication

* User Registration & Login
* Password hashing (bcrypt)
* JWT-based authentication

### 📝 Notes Management (CRUD)

* Create notes
* View notes
* Delete notes

### 🌐 Frontend

* Built with React.js
* Login & Register UI
* Dashboard for managing notes
* Custom success/error notifications

---

## 🛠️ Tech Stack

### Backend

* FastAPI (Python)
* SQLAlchemy (ORM)
* SQLite (Database)
* JWT (Authentication)

### Frontend

* React.js
* Fetch API
