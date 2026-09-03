# MP Automotive Repair — Website

A complete website for MP Automotive Repair (North Little Rock, AR): a public landing page with online service-request booking, plus a password-protected staff dashboard where the shop can view every request.

No Emergent account or service is required to run this site. It is fully portable and can be hosted anywhere.

---

## What's Included

- **Landing page** — services, hours, reviews, tap-to-call, Google Maps directions
- **Online booking form** — customers request a service, date, and time; requests are stored in the database
- **Staff dashboard** (`/staff`) — password-protected list of all booking requests
- **Staff login** — one shared staff account, email + password, session lasts 7 days

## Tech Stack

| Part | Technology | Where it can be hosted |
|---|---|---|
| Frontend | React (static build) | Vercel, Netlify, Cloudflare Pages (free) |
| Backend | FastAPI (Python) | Railway, Render, any VPS (~$0–5/mo) |
| Database | MongoDB | MongoDB Atlas (free tier) |

---

## Environment Variables

### Backend (`backend/.env`)

```
MONGO_URL="mongodb+srv://..."     # your MongoDB connection string
DB_NAME="mp_automotive"           # any database name
CORS_ORIGINS="*"                  # or your frontend domain for tighter security
JWT_SECRET="<64 random characters>"  # used to sign login sessions — keep secret
ADMIN_EMAIL="staff@yourshop.com"  # staff login email
ADMIN_PASSWORD="<choose a strong password>"  # staff login password
```

### Frontend (`frontend/.env`)

```
REACT_APP_BACKEND_URL="https://your-backend-domain.com"
```

**To change the staff password:** update `ADMIN_PASSWORD` in the backend environment and restart the backend. The new password is applied automatically on startup.

---

## Run Locally (for developers)

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001

# Frontend (separate terminal)
cd frontend
yarn install
yarn start
```

Frontend runs on http://localhost:3000, backend on http://localhost:8001. All backend routes are prefixed with `/api`.

---

## Deployment Guide (recommended free/cheap setup)

### 1. Database — MongoDB Atlas (free)
1. Create a free account at https://cloud.mongodb.com
2. Create a free M0 cluster
3. Create a database user, then click **Connect → Drivers** and copy the connection string
4. Use it as `MONGO_URL`

### 2. Backend — Railway or Render
1. Push this repo to GitHub
2. Create a new service from the repo, root directory `backend`
3. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. Add all backend environment variables listed above
5. Copy the public URL Railway/Render gives you

### 3. Frontend — Vercel or Netlify
1. Create a new project from the repo, root directory `frontend`
2. Build command: `yarn build`, output directory: `build`
3. Set `REACT_APP_BACKEND_URL` to your backend URL from step 2
4. Add a rewrite rule so all paths serve `index.html` (single-page app)

### 4. Custom domain
Point the shop's domain (e.g. `mpautorepair.com`) to the frontend host. Both Vercel and Netlify have a "Domains" settings page with instructions.

> If frontend and backend are on different domains, set `CORS_ORIGINS` on the backend to the frontend's exact domain (e.g. `https://mpautorepair.com`).

---

## Handoff Checklist

- [ ] Code pushed to a GitHub repo the client owns (or shared with them)
- [ ] Client created their own MongoDB Atlas + hosting accounts
- [ ] `ADMIN_EMAIL` / `ADMIN_PASSWORD` set to the shop's real credentials
- [ ] `JWT_SECRET` is a fresh random value (never reuse the demo one)
- [ ] Site tested end-to-end on the client's domain: booking form submits, staff login works, requests appear in `/staff`
- [ ] This README included in the repo

## Updating Content

All business info (phone, address, hours, services, reviews) lives in one file: `frontend/src/data.js`. Edit the values and redeploy — no other changes needed.
