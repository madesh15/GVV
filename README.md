# GVV Driving School — React Frontend

A complete multi-page React application for **GVV Driving School**, Chennai.  
Converted from the original single-file HTML into a fully structured React project.

---

## 📁 Project Structure

```
gvv-driving-school/
├── public/
│   └── index.html              # HTML shell with Google Fonts
├── src/
│   ├── index.js                # React entry point
│   ├── index.css               # Global CSS variables & base styles
│   ├── App.js                  # Root component & page router
│   ├── components/
│   │   ├── Navbar.js           # Fixed navigation bar
│   │   ├── Footer.js           # Shared footer
│   │   ├── FloatingButtons.js  # Floating CTAs (scroll-triggered)
│   │   ├── InnerPageHero.js    # Reusable inner-page hero banner
│   │   └── useReveal.js        # Intersection Observer scroll hook
│   └── pages/
│       ├── LandingPage.js      # Home page (hero, about, why, reviews, CTA)
│       ├── CoursesPage.js      # Courses with filter tabs
│       ├── LadiesPage.js       # Ladies program + enrollment form
│       └── ContactPage.js      # Contact info + message form
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v14 or higher
- **npm** v6 or higher

Check your versions:
```bash
node --version
npm --version
```

### Installation

```bash
# 1. Navigate into the project folder
cd gvv-driving-school

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at **http://localhost:3000** automatically.

---

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

To preview the production build locally:
```bash
npm install -g serve
serve -s build
```

---

## 🌐 Pages

| Route (via state) | Description |
|---|---|
| `landing` | Home page — ticker, hero, about, why us, ladies teaser, reviews, CTA |
| `courses` | All courses with filter by category (Car / Bike / Ladies / Heavy / Advanced) |
| `ladies` | Ladies Teaches Ladies program + enrollment form with validation |
| `contact` | Contact info, schedule, WhatsApp link, and contact form |

---

## ✨ Features

- **Single-page app** with client-side routing (no React Router needed)
- **Scroll reveal animations** using IntersectionObserver
- **Floating action buttons** that appear after scrolling 350px
- **Course filter** — filter by vehicle type or ladies special
- **Enrollment form** (Ladies page) with validation and success state
- **Contact form** with validation and success state
- **Fully responsive** — mobile, tablet, and desktop
- **Google Fonts** — Playfair Display, DM Sans, Bebas Neue

---

## 🎨 Design Tokens (CSS Variables)

Defined in `src/index.css`:

| Variable | Value | Usage |
|---|---|---|
| `--navy` | `#0B1F3A` | Primary dark |
| `--gold` | `#C9A84C` | Primary accent |
| `--rose-deep` | `#D63384` | Ladies program accent |
| `--green` | `#1A6B3C` | Government approved badges |

---

## 📞 Contact Details (Configured)

- **Phone:** +91 98400 12345 (General), +91 98400 67890 (Ladies)
- **Email:** info@gvvdrivingschool.in / ladies@gvvdrivingschool.in
- **Address:** 42, Anna Salai, Guindy, Chennai – 600 032
- **Reg. No:** TN/DS/2005/0412
