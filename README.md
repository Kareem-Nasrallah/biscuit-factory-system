# 🏭 Factory Management System

A complete **Factory Management System** built with **React**, **TypeScript**, and **Tailwind CSS**, designed to manage and monitor all aspects of a production factory — from production lines and inventory to staff performance and quality reports.

> ⚙️ The system is currently frontend-only, using mock data instead of a backend API (see `/mocks_data` folder).

---

## 🚀 Features

### 👨‍💼 Roles & Permissions

- Multiple user roles: **Owner**, **Production Manager**, **Inventory Manager**, and others.
- Role-based routes and access control using React Router.

### 🏗️ Factory Operations

- **Production line management:** monitor performance and status of each line.
- **Quality reports:** track product quality and factory KPIs.
- **Inventory control:** manage raw materials, quantities, and stock updates.
- **Employee management:** track worker assignments and performance.

### 📊 Analytics & Reports

- Visual dashboards with charts using **Recharts**.
- Owner reports aggregating production, quality, and performance data.

### 💰 Coming Soon

- Accounting and financial overview.
- Product catalog & classifications.
- Client and supplier management modules.

---

## 🧠 Tech Stack

| Category                   | Technologies                                                               |
| -------------------------- | -------------------------------------------------------------------------- |
| **Frontend Framework**     | React 18 + TypeScript                                                      |
| **UI Library**             | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com/) |
| **Styling**                | Tailwind CSS + tailwind-merge + tailwindcss-animate                        |
| **State Management**       | Redux Toolkit                                                              |
| **Forms & Validation**     | Formik + Yup / React Hook Form + Zod                                       |
| **Routing**                | React Router v6                                                            |
| **Localization (i18n)**    | i18next + react-i18next                                                    |
| **Data Simulation**        | `mocks_data` (local JSON-based mock data)                                  |
| **Charts & Visualization** | Recharts                                                                   |
| **Utilities**              | class-variance-authority, clsx, date-fns, sonner (toasts)                  |
| **Build Tool**             | Vite 5                                                                     |
| **Language & Linting**     | TypeScript + ESLint                                                        |

---

## 🧩 Folder Structure (Simplified)

src/
┣ components/ # Reusable UI components
┣ features/ # Modules (Production, Inventory, etc.)
┣ hooks/ # Custom React hooks
┣ pages/ # Main pages for each user role
┣ redux/ # Redux store & slices
┣ mocks_data/ # Mock JSON data (used instead of backend)
┣ i18n/ # Translations setup (English & Arabic)
┗ App.tsx

---

## ⚙️ Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the development server

```bash
npm run dev
```

The app will start on:

```arduino
http://localhost:5173
```

## 🧰 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run lint`    | Run ESLint               |
| `npm run preview` | Preview production build |

## 📦 Dependencies Overview

This project uses modern frontend tooling:

- @reduxjs/toolkit for global state
- react-hook-form & formik for flexible form handling
- i18next for localization
- shadcn/ui for beautiful UI components built on Radix primitives
- Vite for fast build & dev server

## 🧪 Mock Data Setup

Since there’s no backend connected yet:

- All data (users, production lines, inventory, etc.) is stored in /mocks_data.
- The app simulates API calls by reading from these local files.
- This structure allows easy migration to a real backend in the future.

## 👨‍💻 Author

Kareem Nasrallah
Frontend Developer — React, TypeScript, Tailwind, Redux Toolkit
📧 kareemnasrallah88@gmail.com
🌐 [GitHub](https://github.com/Kareem-Nasrallah)

## 🧭 License

This project is open source and available under the MIT License
