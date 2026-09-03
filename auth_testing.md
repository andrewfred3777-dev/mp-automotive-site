# Auth Testing Playbook (Password Staff Login)

Staff login is a single shared account seeded from backend env vars `ADMIN_EMAIL` / `ADMIN_PASSWORD` at backend startup. Sessions are JWT access (15 min, httpOnly cookie `access_token`) + refresh (7 days, httpOnly cookie `refresh_token`).

Step 1: MongoDB Verification
```bash
mongosh --eval "
use('test_database');
db.users.find({role: 'staff'}).pretty();
"
```
Verify: user exists with the admin email, `password_hash` starts with `$2b$`.

Step 2: API Testing
```bash
API=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)

# Login (expect user JSON + Set-Cookie headers)
curl -c /tmp/cookies.txt -X POST "$API/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"ADMIN_EMAIL_HERE","password":"ADMIN_PASSWORD_HERE"}'

# Authenticated requests with cookies
curl -b /tmp/cookies.txt "$API/api/auth/me"
curl -b /tmp/cookies.txt "$API/api/appointments"

# Wrong password (expect 401 "Invalid email or password")
curl -X POST "$API/api/auth/login" -H "Content-Type: application/json" \
  -d '{"email":"ADMIN_EMAIL_HERE","password":"wrong"}'

# 5 wrong attempts = 15-min lockout (expect 429)

# No auth (expect 401)
curl "$API/api/appointments"

# Logout
curl -b /tmp/cookies.txt -c /tmp/cookies.txt -X POST "$API/api/auth/logout"
```

Step 3: Browser Testing
1. Go to `/staff` logged out → password login form appears
2. Log in with staff credentials → dashboard with appointments table appears
3. Reload the page → still logged in (cookie persists)
4. Click Logout → back to landing page; `/staff` shows login form again

Success: login returns user JSON, /api/auth/me works with cookie, dashboard lists appointments.
Failure: 401 after login, missing Set-Cookie, dashboard stuck on "Checking access…".
