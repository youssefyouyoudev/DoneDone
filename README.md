# DoneDone – Smart To-Do 2.0 🧠✨

DoneDone is a modern productivity app built with React, Vite, Redux Toolkit, and DnD + charts. It feels like a lightweight SaaS: landing page, dashboard analytics, Kanban, smart filters, and a polished light/dark experience.

## 🚀 Feature Highlights
- 📌 Multi-view app: Landing, Dashboard, Tasks list, Kanban Board, Settings
- 🏷️ Tags + priorities (high/medium/low) with filters and search
- 🖱️ Drag-and-drop Kanban columns (To Do / In Progress / Done)
- 📊 Weekly stats (created vs completed) and smart “due today” insights
- 💾 Persistence via localStorage; Redux Toolkit state + middleware
- 🎨 Light/Dark themes with floating sun/moon toggle (always visible)
- 🧭 Client-side routing (react-router) so reloads keep your page

## 🗺️ Routes
| Path | Purpose |
| --- | --- |
| `/` | Landing page with CTA |
| `/dashboard` | Analytics + focus queue + quick add |
| `/tasks` | Full CRUD list with filters/search |
| `/board` | Kanban drag-and-drop view |
| `/settings` | Theme and data snapshot |

## 🛠️ Tech Stack
- React + Vite
- Redux Toolkit + React Redux
- React Router
- @dnd-kit/core (drag & drop)
- Recharts (analytics)
- CSS (custom design system, light/dark)

## 📥 Setup (beginner-friendly)
1) Install Node.js (LTS). On Windows PowerShell, allow install command for this session:
	```powershell
	Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
	npm install
	```
2) Start the dev server:
	```powershell
	npm run dev
	```
3) Open the shown local URL in your browser. Use the floating theme toggle (bottom-right) anytime.

## 🧩 Core Concepts (simple)
- **Tasks**: title, description, tags, priority, status, due date, completedAt
- **Filters**: search in title/description, tag selection, priority dropdown
- **Drag & Drop**: move tasks across columns; dropping in Done also completes
- **Persistence**: Redux middleware saves tasks to localStorage automatically
- **Analytics**: Weekly creation vs completion chart + completion rate

## 🔧 Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview build locally
- `npm run lint` – lint with ESLint

## 🎨 Theming
- Light/Dark modes with sun/moon toggle (fixed bottom-right)
- Theme choice stored in localStorage; applies instantly across routes

## 📂 Project Structure (key folders)
- `src/pages` – Landing, Dashboard, Tasks, Board, Settings
- `src/components` – Task cards, board, filters, stats, modals, theme toggle
- `src/store` – Redux store and task slice
- `src/services` – localStorage helpers

## ✅ Using the App
1) Go to `/dashboard` or `/tasks` and add a task (title required).
2) Tag it, set priority, and due date if needed.
3) Drag tasks on `/board` to update status, or click Complete/Edit/Delete on cards.
4) Check `/settings` for theme and data count; review charts on `/dashboard`.

## 🔒 License / Rights
© 2026 DoneDone. All rights reserved.

Enjoy building and shipping with DoneDone! 🎯
