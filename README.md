# ☕ Ember & Bloom Coffee Roasters

> A boutique café web application for artisanal, single-origin coffee lovers — handcrafted with fire, precision, and fellowship.

![Ember & Bloom Coffee Roasters Banner](https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1400&q=80)

---

## 📖 Overview

**Ember & Bloom** is a full-stack, production-grade web application built for an artisanal boutique coffee roastery and café. The application features a rich, responsive frontend with deep warm espresso and golden typography, paired with a resilient Node.js / Express REST API. 

Visitors can explore a curated, filterable menu with origin terroir notes and dietary badges, discover the brand's ethical direct-trade farmgate partnerships, view live operating hours with real-time open/closed calculation, submit contact inquiries, and subscribe to the weekly roastery gazette.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **React 18** (Functional components, custom hooks, React Router v6)
- **Tailwind CSS 3** (Custom artisanal palette: deep espressos, warm creams, and amber golds)
- **Vite 6** (Ultra-fast HMR and optimized production bundling)
- **Lucide React** (Crisp, modern iconography)
- **Custom Design System** (Fraunces editorial serif + Plus Jakarta Sans, accessible contrast, custom notifications)

### Backend (`/server`)
- **Node.js** (LTS v18+ / v20+ / v24+)
- **Express.js 4** (RESTful API architecture)
- **CORS** (Cross-Origin Resource Sharing with customizable origins)
- **Dotenv** (Environment configuration)
- **File-Based JSON Database Store** (Atomic async read/write store; zero cloud setup required, easily swappable for MongoDB or PostgreSQL)
- **Input Validation & Sanitization** (Server-side validation for form inputs with descriptive error payloads)
- **Automated Test Suite** (Zero-dependency native test harness verifying health, menu filtering, validation, and newsletter persistence)

---

## 📁 Folder Structure Overview

```text
test_2/
├── package.json              # Monorepo runner (concurrently scripts)
├── README.md                 # Project documentation
│
├── server/                   # Node.js + Express REST API
│   ├── package.json
│   ├── .env.example          # Environment variables template
│   ├── .env                  # Active environment variables
│   ├── src/
│   │   ├── index.js          # Express app entrypoint & middleware setup
│   │   ├── routes/
│   │   │   ├── menu.js       # Routes for GET /api/menu
│   │   │   ├── contact.js    # Routes for POST /api/contact
│   │   │   └── newsletter.js # Routes for POST /api/newsletter
│   │   ├── controllers/
│   │   │   ├── menuController.js
│   │   │   ├── contactController.js
│   │   │   └── newsletterController.js
│   │   ├── middleware/
│   │   │   ├── validator.js   # Input validation middleware
│   │   │   └── errorHandler.js# Centralized error & 404 handlers
│   │   ├── data/             # Persistent JSON stores
│   │   │   ├── menu.json      # Categorized menu with origins & dietary tags
│   │   │   ├── contacts.json  # Stored contact submissions
│   │   │   └── newsletter.json# Registered newsletter subscribers
│   │   └── tests/
│   │       └── api.test.js    # Automated API test suite
│
└── client/                   # React 18 + Vite + Tailwind Client
    ├── package.json
    ├── vite.config.js        # Vite config with /api reverse proxy
    ├── tailwind.config.js    # Artisanal color tokens & typography scale
    ├── postcss.config.js
    ├── index.html            # Preloaded Google Fonts & meta tags
    └── src/
        ├── main.jsx          # React DOM entrypoint with BrowserRouter
        ├── App.jsx           # Route views & toast context provider
        ├── index.css         # Tailwind directives & artisanal custom utilities
        ├── api/
        │   └── client.js     # Centralized fetch wrapper for backend endpoints
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.jsx # Glassmorphic sticky header & mobile drawer
        │   │   └── Footer.jsx # Artisanal footer with working newsletter form
        │   ├── ui/
        │   │   ├── Button.jsx # Gold glow, secondary espresso, and outline buttons
        │   │   ├── Badge.jsx  # Dietary badges (Vegan, GF, Dairy-Free, Roast)
        │   │   ├── Card.jsx   # Elevated container with subtle warm border
        │   │   ├── SectionHeader.jsx # Reusable editorial heading with eyebrow
        │   │   └── ToastContext.jsx  # Global toast notification system
        │   └── sections/
        │       ├── Hero.jsx        # Atmospheric hero with value badges & CTAs
        │       ├── StoryTeaser.jsx # Origin philosophy & impact counters
        │       ├── FeaturedMenu.jsx# Live-fetched curated menu items
        │       ├── GalleryGrid.jsx # 6-photo atmosphere & coffee craft grid
        │       └── Testimonials.jsx# Quotes from critics and regulars
        └── pages/
            ├── HomePage.jsx       # Route: /
            ├── MenuPage.jsx       # Route: /menu (categorized, dietary & search)
            ├── AboutPage.jsx      # Route: /about (origins, craft timeline, team)
            ├── ContactPage.jsx    # Route: /contact (hours, live status, map, form)
            └── NotFoundPage.jsx   # Route: * (404 page)
```

---

## ⚡ Prerequisites

- **Node.js**: `v18.0.0` or higher (`v20.x` or `v24.x` recommended)
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

Check your installed versions:
```bash
node -v
npm -v
```

---

## 🚀 Quick Start (Single Command)

From the project root:

```bash
# 1. Install dependencies across root, server, and client
npm run install:all

# 2. Run both Backend and Frontend concurrently in development mode
npm run dev
```

- **Frontend Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 📦 Individual Installation & Development

If you prefer running the frontend and backend in separate terminal tabs:

### 1. Backend Server Setup
```bash
cd server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run automated tests
npm test

# Start the server with hot-reload (nodemon)
npm run dev
```
The server will boot at `http://localhost:5000`.

### 2. Frontend Client Setup
```bash
cd client

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
The client will launch at `http://localhost:5173`.

---

## 🔐 Environment Variables

The backend uses a `.env` file in the `/server` directory:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port for the Express server to listen on |
| `CLIENT_URL` | `http://localhost:5173` | Allowed origin for CORS in development/production |
| `NODE_ENV` | `development` | Environment mode (`development` or `production`) |

---

## 📡 Available API Endpoints

| Method | Route | Description | Request Body / Query | Success Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service uptime and healthcheck | None | `{ status: "ok", uptime: ... }` |
| `GET` | `/api/menu` | List all menu items with metadata | Query: `?category=...&dietary=...&featured=true` | `{ success: true, count: 14, data: [...] }` |
| `GET` | `/api/menu/:id` | Get single menu item by ID | URL parameter `:id` | `{ success: true, data: { ... } }` |
| `POST` | `/api/contact` | Submit contact form message | `{ name, email, subject, message }` | `201 Created` with saved contact record |
| `GET` | `/api/contact` | Administrative list of submissions | None | `{ success: true, data: [...] }` |
| `POST` | `/api/newsletter`| Join roastery newsletter | `{ email: "user@example.com" }` | `201 Created` (or `200` if already subscribed) |
| `GET` | `/api/newsletter`| Administrative list of subscribers | None | `{ success: true, data: [...] }` |

### Sample Contact Form Payload
```json
{
  "name": "Eleanor Rigby",
  "email": "eleanor@example.com",
  "subject": "Cupping & Workshops",
  "message": "I would love to reserve seats for the Saturday morning cupping lab."
}
```

---

## 🧪 Testing

The backend includes a comprehensive automated test suite testing the live HTTP routes:

```bash
cd server
npm test
```

This verifies:
- `GET /api/health` status
- `GET /api/menu` response structure & categories
- Query filtering on `/api/menu?category=...`
- Validation rejection (400) on malformed contact forms
- Successful persistence (201) on valid contact submissions
- Newsletter subscription and duplicate handling

---

## 🚢 Building for Production

### Build the Frontend
```bash
cd client
npm run build
```
This outputs a production-ready, minified bundle into `client/dist/`.

### Serving in Production
You can serve the static build via:
1. **Full-stack single host**: Configure Express in `server/src/index.js` to serve `client/dist/` as static assets:
   ```javascript
   app.use(express.static(path.join(__dirname, '../../client/dist')));
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
   });
   ```
2. **Decoupled deployment**:
   - Deploy `/client` to **Vercel**, **Netlify**, or **Cloudflare Pages**
   - Deploy `/server` to **Render**, **Railway**, or **Fly.io**
   - Set `CLIENT_URL` in the server's environment variables to the production frontend domain.

---

## 💡 Extensibility: Connecting a Database

The data layer in `server/src/controllers/` uses an asynchronous file-based pattern that maps 1:1 with document-oriented databases like **MongoDB (Mongoose)**:

```javascript
// Example drop-in replacement with Mongoose:
const Contact = require('../models/Contact');

async function handleContactSubmission(req, res, next) {
  try {
    const contact = await Contact.create(req.sanitizedBody);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
}
```

---

## 🎨 Design & Aesthetic Notes

- **Palette**: Deep Roasted Espresso (`#0d0806`, `#17100b`, `#2e2017`), Warm Oat Cream (`#fefcf8`, `#f8f4ec`, `#eee6d5`), and Honey Gold accents (`#cf982b`, `#e8be62`).
- **Typography**: Editorial serif headings with `Fraunces` and clean, readable UI copy with `Plus Jakarta Sans`.
- **Accessibility**: High-contrast ratios, keyboard focus rings, semantic HTML structure, and screen reader live regions for notifications.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
# test_2
