
# 💧 Jal Dhara – Smart Water Tanker Management System
## Phase 1: Frontend with Mock Data

### Design System
- **Palette:** Arctic Frost (#e8f0f8, #b8d4e8, #6ba3c8, #2e6b8a) with glassmorphism effects
- **Typography:** Outfit (headings) + Figtree (body)
- **Style:** Glassmorphism cards, liquid buttons, smooth hover effects, loading skeletons, toast notifications, dark mode toggle

### Pages to Build
1. **Landing Page** — Hero section with water animation, features grid, CTA, footer
2. **Login/Register** — Role selector (User/Driver/Admin), form with validation, glassmorphism card
3. **User Dashboard** — Book a tanker (location picker placeholder, tanker size selector), booking history list, active booking status with ETA, notifications panel
4. **Admin Dashboard** — Stats overview (total bookings, active tankers, drivers), manage users/drivers/tankers tables, analytics charts (area-wise demand, delivery efficiency, tanker usage), booking assignment panel
5. **Driver Panel** — Assigned requests list, delivery status updater (Accepted → On the way → Delivered), navigation placeholder
6. **Live Tracking Page** — Map placeholder showing tanker position, ETA display, booking details sidebar

### Shared Components
- Responsive sidebar navigation with role-based menu items
- Top navbar with dark mode toggle and notifications bell
- Glassmorphism card component used throughout
- Loading skeletons for all data sections
- Toast notification system
- Mobile-first responsive layout

### Mock Data
- Sample bookings, users, drivers, and tankers
- Simulated booking flow (select location → choose size → confirm → track)
- Chart data for admin analytics (using Recharts)

### Key Interactions
- Booking flow: multi-step form with progress indicator
- Status updates with animated transitions
- Dark/light mode toggle persisted to localStorage
- Search & filter on booking tables
- Priority badge system (Emergency vs Normal)
