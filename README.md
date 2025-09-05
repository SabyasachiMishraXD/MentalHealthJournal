# 🧠 Mental Health Journal Assistant

A journaling web app that allows users to write daily reflections, and get emotional insights powered by an LLM (via Ollama). Users can register, login, write journal entries, receive mood analysis with emoji, and browse past journals.

---

## 🌟 Features

- ✍️ Write personal journal entries daily
- 💡 Receive AI-generated:
  - Mood (e.g., happy, anxious)
  - Emoji based on mood
  - One-line encouraging feedback
  - A fresh journaling prompt for next entry
- 📜 View your past journals
- 🔐 Auth system (Signup, Login, Logout)
- 🍪 JWT-based cookie auth (with httpOnly)
- 🌐 MongoDB with Prisma
- 🦙 Local LLM response using [Ollama](https://ollama.com/)

---

## 🖥️ Tech Stack

| Layer      | Tech                    |
|------------|-------------------------|
| Frontend   | React, Tailwind CSS     |
| Backend    | Node.js, Express.js     |
| LLM        | Ollama (local LLM API)  |
| Database   | MongoDB + Prisma ORM    |
| Auth       | JWT with cookie storage |
| Dev Tools  | Axios, React Router DOM |

---

## 📸 UI Preview

| Page              | Description                            |
|-------------------|----------------------------------------|
| /login          | Login form                             |
| /signup         | User registration                      |
| /journal        | Journal writing interface with AI      |
| /history        | Displays past reflections + feedback   |

---
