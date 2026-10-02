# 🍽 Restaurant Management Dashboard

A fast, dynamic and user-friendly management panel for modern restaurant operations.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://gusto-restaurant-dashboard.vercel.app)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## 📖 About

The dashboard lets a restaurant follow its daily order traffic, menu and financial statistics in one place. It is built around a global state (React Context API), and orders come from a simulated data stream, so you can take orders, manage stock and watch the restaurant's traffic right away.

## 📸 Screenshots

The interface is in Turkish and starts with demo data (the "Sıfırla" button resets it).

| Dashboard | Orders |
|---|---|
| ![Dashboard](docs/screenshots/01-dashboard.png) | ![Orders](docs/screenshots/02-orders.png) |

| Inventory with low-stock alerts | Menu, recipes and profit margins |
|---|---|
| ![Inventory](docs/screenshots/03-inventory.png) | ![Recipes](docs/screenshots/04-recipes.png) |

## ✨ Features

- 🧾 **Live order management:** new orders appear instantly and move through preparing / completed statuses
- 📦 **Dynamic inventory:** stock is reduced automatically from incoming orders and recipe ingredients
- 📊 **Financial statistics:** daily revenue, order volume and table occupancy
- 📖 **Menu management:** products, pricing and recipe simulation

## 🛠 Tech stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern, fast and maintainable UI |
| **TypeScript** | Static typing for type-safe code |
| **Context API** | Lightweight global state management |
| **Tailwind CSS** | Responsive, mobile-friendly styling |
| **Vite** | Dev server and build tool |
| **Vercel** | Deployment |

## 🚀 Getting started

```bash
git clone https://github.com/yusuf-koyuncu/Restoran-Dashboard.git
cd Restoran-Dashboard
npm install
npm run dev
```

Then open `http://localhost:5173`.

---
Developed by [Yusuf Koyuncu](https://github.com/yusuf-koyuncu)
