
# DoneDone – Smart To-Do 2.0 🧠✨

*A modern productivity dashboard built with React + Vite.*

DoneDone is a lightweight SaaS-style task management app focused on **productivity, clarity, and user experience**. It combines task lists, Kanban workflow, smart filters, and analytics into one clean interface.

> Think: **Todoist + Trello (lite) + Dashboard analytics**

---

## 🚀 Features

### Core

* Multi-view application: **Landing, Dashboard, Tasks, Board, Settings**
* Full task lifecycle: create, edit, complete, delete
* Task fields: title, description, tags, priority, status, due date

### Organization

* Tags system (multiple tags per task)
* Priority levels: high / medium / low
* Smart filters: search, tag filter, priority filter
* Focus queue: high-priority tasks due today

### Workflow

* Kanban board with drag & drop:

  * To Do
  * In Progress
  * Done
* Dropping into "Done" automatically completes the task

### Analytics

* Weekly tasks created vs completed
* Completion rate (%)
* Real-time stats powered by derived Redux state

### UX & UI

* Light/Dark mode
* Accent color picker (grape, ocean, amber, emerald, rose)
* Floating theme toggle (always visible)
* Responsive layout (desktop & mobile friendly)

### Persistence

* Global state via Redux Toolkit
* Auto-saved to `localStorage` using middleware
* Reload-safe routing (deep links supported)

---

## 🗺️ Routes

| Path         | Description           |
| ------------ | --------------------- |
| `/`          | Landing page          |
| `/dashboard` | Analytics + quick add |
| `/tasks`     | Task list + filters   |
| `/board`     | Kanban drag & drop    |
| `/settings`  | Theme + data snapshot |

---

## 🛠️ Tech Stack

* **React 18 + Vite**
* **Redux Toolkit**
* **React Router**
* **@dnd-kit/core** (drag & drop)
* **Recharts** (charts)
* Custom CSS design system

---

## 📦 Getting Started

### Requirements

* Node.js (LTS)

### Install & Run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

---

## 🧠 Core Data Model

```js
{
  id: string,
  title: string,
  description: string,
  tags: string[],
  priority: "high" | "medium" | "low",
  status: "todo" | "in_progress" | "done",
  dueDate: string | null,
  completedAt: string | null,
  createdAt: string
}
```

---

## 📊 Analytics Logic

All analytics are computed from Redux state:

* Weekly creation count
* Weekly completion count
* Completion rate = completed / created
* Focus queue = high priority + due today

No external API required.

---

## 📁 Project Structure

```
src/
 ├ pages/        Landing, Dashboard, Tasks, Board, Settings
 ├ components/   TaskCard, Filters, BoardColumn, Charts, Modals
 ├ store/        Redux store + task slice
 ├ services/     localStorage sync
 ├ styles/       Theme system
 └ utils/        Date & stats helpers
```

---

## 🎨 Theming System

* Global theme context
* Light/Dark toggle
* Accent color applied via CSS variables
* Preferences persisted in localStorage

---

## 📜 Scripts

| Command           | Purpose          |
| ----------------- | ---------------- |
| `npm run dev`     | Start dev server |
| `npm run build`   | Production build |
| `npm run preview` | Preview build    |
| `npm run lint`    | Run ESLint       |

---

## 🧭 Roadmap

Planned upgrades:

* Firebase authentication & cloud sync
* PWA offline mode
* Pomodoro timer per task
* Export tasks (CSV / PDF)
* Team & shared boards

---

## 🎯 Why This Project Exists

This project was built to practice:

* Real-world **state management**
* UX-driven **product design**
* Dashboard-style **frontend architecture**
* Building apps that feel like **actual SaaS products**

Not just tutorials — real software patterns.

---

## 📜 License

© 2026 DoneDone
All rights reserved.

---

## 👤 Author

Built by **Youssef Youyou**
Full-stack developer focused on SaaS products and modern web apps.

---


