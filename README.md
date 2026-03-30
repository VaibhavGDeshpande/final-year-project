# MapMyStore — Setup & Run Guide

> **Stack**: Next.js 16 frontend · Node.js backend · Python FastAPI ML service · PostgreSQL

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 18 | [nodejs.org](https://nodejs.org) |
| Python | ≥ 3.10 | [python.org](https://python.org) |
| PostgreSQL | ≥ 14 | [postgresql.org](https://www.postgresql.org) |
| Git | any | [git-scm.com](https://git-scm.com) |

---

## 1. Clone the Repo

```bash
git clone <your-repo-url>
cd final-year-project
```

---

## 2. Environment Variables

### Root `.env` (for Python scripts / scraper)
```env
DB_HOST=localhost
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
DB_PORT=5432
```

### Frontend `.env.local`
```
# d:\Projects\BE\final-year-project\frontend\mapmystore\.env.local
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key   # optional, for navigation links
```

---

## 3. Python Virtual Environment (shared)

Run once from the project root:

```bash
python -m venv .venv

# Activate — Windows PowerShell
.\.venv\Scripts\Activate.ps1

# Activate — macOS/Linux
source .venv/bin/activate

# Install all Python dependencies
pip install -r requirements.txt
pip install -r requirements_ml.txt
```

---

## 4. Running the Three Services

Each service runs in its **own terminal**. Start all three before using the app.

---

### 🟢 Terminal 1 — ML Service (FastAPI, port 8001)

```bash
cd ml_service

# Activate venv first  (Windows)
..\.venv\Scripts\Activate.ps1

python -m uvicorn api:app --reload --port 8001
```

> Healthcheck: http://localhost:8001/docs

---

### 🟡 Terminal 2 — Backend API (Node.js, port 3001)

```bash
cd backend
npm install        # first time only
npm run dev
```

> Healthcheck: http://localhost:3001

---

### 🔵 Terminal 3 — Frontend (Next.js, port 3000)

```bash
cd frontend/mapmystore
npm install        # first time only
npm run dev
```

> App: http://localhost:3000

---

## 5. Production Build (Frontend)

```bash
cd frontend/mapmystore
npm run build
npm run start
```

---

## 6. Quick Reference

| Command | What it does |
|---------|-------------|
| `.\.venv\Scripts\Activate.ps1` | Activate Python venv (Windows) |
| `python -m uvicorn api:app --reload --port 8001` | Start ML service |
| `npm run dev` (in `/backend`) | Start Node.js API |
| `npm run dev` (in `/frontend/mapmystore`) | Start Next.js dev server |
| `npm run build` (in `/frontend/mapmystore`) | Production build |

---

## 7. Common Issues

| Issue | Fix |
|-------|-----|
| `ModuleNotFoundError` in ML service | Activate `.venv` before running uvicorn |
| Port 3001 already in use | `npx kill-port 3001` |
| Port 8001 already in use | `npx kill-port 8001` |
| Leaflet CSS error on build | Ensure `import "leaflet/dist/leaflet.css"` is in `layout.tsx` |
| `NEXTAUTH_SECRET` missing | Add it to `frontend/mapmystore/.env.local` |
