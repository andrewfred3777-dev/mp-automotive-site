# PRD — MP Automotive Repair Landing Site

## Original Problem Statement
Single-page marketing site for MP Automotive Repair (North Little Rock, AR). Services: brakes, tires, suspension, shocks, struts, tie rods, engine, transmission, warranty work, lifters, cam, battery, A/C, filters. Phone (501) 599-6910, hours Mon–Fri 8AM–5PM, address 8890 Landers Rd, NLR AR 72117. 5.0 Google rating. User choices: single-page, tap-to-call + directions link (no contact form), online appointment/service request form, clean & modern style, award-worthy Awwwards-level motion design.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll) + sonner toasts + lucide icons. Dark-first tactical theme with light/dark toggle.
- Backend: FastAPI, `/api/appointments` POST/GET, MongoDB via MONGO_URL/DB_NAME.
- Components: Navbar, Hero (masked line reveal, canvas rings, parallax, live open/closed status), Marquee, Manifesto (4 chapters), Services (filter tabs + booking preselect), Reviews, LocationHours (today highlight), Footer, AppointmentModal.

## User Personas
- Local driver needing a repair quote fast (call / directions).
- Customer booking a specific service online.
- Shop staff reading appointment requests (GET /api/appointments).

## Implemented (2026-09-02)
- Kinetic hero with masked line-by-line reveal, canvas ring animation, parallax photo bg, live OPEN/CLOSED pill, stats grid
- Red editorial marquee ribbon with all services
- Numbered manifesto chapters (01–04)
- Filterable services grid (10 services, 6 categories) + spotlight photo card
- Appointment modal: service, name, phone, email, vehicle, date (Mon–Fri), time slot, notes → saved to MongoDB, toast confirmation
- Reviews section with real 5.0 Google reviews
- Hours table with "Today" highlight, location card with call + Google Maps directions, accessibility/payment chips
- Footer with giant outlined brand text
- Dark/light theme toggle

## Backlog
- P1: Admin/staff view for appointment requests (protected)
- P1: Email/SMS notification to shop on new request (Resend/Twilio)
- P2: Real embedded Google Map iframe
- P2: Gallery of shop photos, FAQ section, SEO meta/schema.org LocalBusiness

## Next Tasks
1. Ask user if appointment requests should notify the shop (email/SMS integration)
2. Add staff dashboard for viewing requests
3. Embed live Google Map
