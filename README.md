# Vignesh Soma — Portfolio (React + Django + MySQL)

A full-stack single-page portfolio. React renders everything client-side;
all content — About, Skills, Projects, Experience, Education, Certifications —
lives in a MySQL database and is served through a Django REST API. Edit your
content through Django's admin panel, no code changes needed.

```
Browser  ⇄  React (Vite, :5173)  ⇄  Django REST API (:8000)  ⇄  MySQL
```

## What's inside

```
vignesh-portfolio-fullstack/
├── backend/                    Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example            → copy to .env and fill in your MySQL credentials
│   ├── media/resumes/          → your résumé PDF lives here
│   ├── portfolio_backend/      Django project settings/urls
│   └── api/                    the app: models, views, admin, seed command
│
├── frontend/                   React SPA (Vite)
│   ├── package.json
│   ├── .env                    → already points at http://localhost:8000
│   └── src/
│       ├── App.jsx             fetches data, renders the page
│       ├── components/         one file per section, plus Sidebar, icons, etc.
│       ├── hooks/               scrollspy, theme toggle, count-up animation
│       └── index.css           the entire design system (all one file)
│
└── README.md                   you are here
```

## Prerequisites

- **Python 3.10+**
- **Node.js 18+** and npm
- **MySQL 8+** running locally (via a plain install, or XAMPP/WAMP — either is fine, you just need the server running and a username/password that can create databases)

---

## 1. Backend setup

Open a terminal in `backend/`.

**Create and activate a virtual environment**
```bash
python3 -m venv venv

# macOS / Linux
source venv/bin/activate
# Windows
venv\Scripts\activate
```

**Install dependencies**
```bash
pip install -r requirements.txt
```

**Create the database.** Open your MySQL client (command line, MySQL Workbench, or phpMyAdmin if you're on XAMPP) and run:
```sql
CREATE DATABASE vignesh_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Configure your environment**
```bash


```
Open `.env` and fill in your MySQL username/password (`DB_USER`, `DB_PASSWORD`). If you're using XAMPP's default MySQL, `DB_USER=root` with an empty `DB_PASSWORD` usually works as-is.

**Run migrations and load your content**
```bash
python manage.py migrate
python manage.py seed_portfolio
```
`seed_portfolio` populates the database with your résumé content (About, Skills, Projects, Experience, Education, Certifications) and attaches your résumé PDF. It's safe to re-run any time — it updates existing rows instead of duplicating them.

**Create an admin login** (so you can edit content later)
```bash
python manage.py createsuperuser
```

**Run the server**
```bash
python manage.py runserver
```
The API is now live at `http://localhost:8000`. Visit `http://localhost:8000/admin/` and log in with the superuser you just created — every section of the site is editable there.

---

## 2. Frontend setup

Open a **second terminal** in `frontend/` (leave the backend running in the first one).

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` — that's your portfolio, pulling live data from the Django API.

> Both servers need to be running at the same time for the site to work: Django on `:8000`, Vite on `:5173`.

---

## Editing your content

You almost never need to touch code to update the site. Go to `http://localhost:8000/admin/`:

| Section | Where to edit |
|---|---|
| Name, tagline, status, contact info, About paragraphs | **Profile** |
| Skill tags, grouped by category | **Skill categories** |
| Projects, tech tags, bullet points | **Projects** |
| Work experience | **Experience** |
| Degrees | **Education** |
| Certifications | **Certifications** |
| Messages people send you via the contact form | **Contact messages** |

Changes appear on the site the next time you reload the page — no rebuild needed.

To swap your résumé, drop a new PDF into `backend/media/resumes/` and re-run `python manage.py seed_portfolio`, or just update the file field directly in the admin.

## API reference

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/portfolio/` | GET | Everything the frontend needs, in one call |
| `/api/profile/` | GET | Profile only |
| `/api/skills/`, `/api/projects/`, `/api/experience/`, `/api/education/`, `/api/certifications/` | GET | Individual resources |
| `/api/resume/` | GET | Downloads the résumé PDF (forces download via `Content-Disposition`, works cross-origin) |
| `/api/contact/` | POST | `{ name, email, message }` → stored in **Contact messages** in the admin |

## Customizing the design

Every color, font, and spacing value is defined once at the top of `frontend/src/index.css` under `:root` (dark theme, the default) and `[data-theme='light']` (the toggle in the sidebar). Change a value there and it updates everywhere.

The design leans on two accent colors: `--signal` (warm gold — highlights, CTAs, the audio-detection project) and `--structure` (cool violet — security/auth details, the JWT-based project). The sidebar's animated waveform lives in `src/components/SignalStrip.jsx`.

## Troubleshooting

**"Can't reach the backend" screen in the browser** — Django isn't running, or MySQL isn't running. Check the backend terminal for errors; most commonly MySQL itself is stopped (`mysql.server start` / start it via XAMPP).

**CORS errors in the browser console** — the frontend is running on a different port than `:5173`. Update `CORS_ALLOWED_ORIGINS` in `backend/.env` to match, then restart `runserver`.

**`django.db.utils.OperationalError` on migrate** — MySQL isn't running, or the credentials/database name in `backend/.env` don't match what you created. Double-check both.

**Résumé download opens a blank tab instead of downloading** — make sure you're using the bundled `/api/resume/` endpoint (already wired up in the sidebar and Contact section) rather than linking straight to a file in `media/` — the API endpoint is what forces the download.

## Putting it online later

This README covers local development. Deploying means hosting Django somewhere that supports Python + MySQL (Railway, Render, PythonAnywhere are common beginner-friendly options) and the built React app as static files (Vite's `npm run build` output, deployable to Netlify/Vercel) — just remember to update `VITE_API_BASE_URL` in the frontend and `CORS_ALLOWED_ORIGINS` in the backend to point at each other's real URLs instead of localhost.
