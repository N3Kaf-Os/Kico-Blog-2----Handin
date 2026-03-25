# Kico Blog

Personal blog and art expo built with Node.js, Express, MongoDB, and EJS. Showcases digital and analog artworks with descriptions, a moodboard, and a full admin panel for managing content.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Server | Express |
| Database | MongoDB + Mongoose ODM |
| Templating | EJS (server-side rendering) |
| Styling | Custom CSS (no framework) |

---

## Project Structure

```
kico-blog/
├── app.js                  # Entry point — Express server, DB connection, all routes
├── seed.js                 # Populates DB with initial artworks
├── .env                    # Environment variables (gitignored)
├── models/
│   └── Artwork.js          # Mongoose schema and model
├── views/
│   ├── partials/
│   │   ├── head.ejs        # Shared <head> tag and CSS link
│   │   └── sidebar.ejs     # Shared navigation sidebar
│   ├── index.ejs           # Home page
│   ├── gallery.ejs         # Gallery — renders artworks from DB
│   ├── artwork.ejs         # Single artwork detail page
│   ├── inspiration.ejs     # Moodboard / references
│   ├── about.ejs           # About the project
│   ├── 404.ejs             # Not found page
│   └── admin/
│       ├── index.ejs       # Admin — list all artworks
│       ├── new.ejs         # Admin — create artwork form
│       └── edit.ejs        # Admin — edit artwork form
└── public/
    └── styles.css          # Global styles, responsive layout, admin UI
```

---

## Data Model

**Artwork** (`models/Artwork.js`)

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Required |
| `slug` | String | Required, unique — used in URL (`/art/hat-man`) |
| `imageUrl` | String | Required |
| `description` | String | Required |
| `medium` | String | `"Digital"` or `"Analog"` |
| `artDate` | Date | Date the artwork was created |
| `createdAt` | Date | Auto-managed by Mongoose |
| `updatedAt` | Date | Auto-managed by Mongoose |

---

## Routes

### Public

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page |
| GET | `/gallery` | All artworks from DB, sorted by date |
| GET | `/art/:slug` | Single artwork detail |
| GET | `/inspiration` | Moodboard and references |
| GET | `/about` | About the project |

### Admin (CRUD)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/admin` | List all artworks |
| GET | `/admin/new` | New artwork form |
| POST | `/admin` | Create artwork |
| GET | `/admin/:id/edit` | Edit artwork form |
| PUT | `/admin/:id` | Update artwork |
| DELETE | `/admin/:id` | Delete artwork |

> PUT and DELETE are sent as POST requests with `?_method=PUT` / `?_method=DELETE` via `method-override`.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file at the project root:

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/kico-blog
PORT=3000
```

Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) or a local MongoDB instance (`mongodb://localhost:27017/kico-blog`).

### 3. Seed the database

Populates the DB with the three initial artworks:

```bash
node seed.js
```

### 4. Start the server

```bash
npm start          # production
npm run dev        # development (auto-restarts on file changes)
```

Visit `http://localhost:3000`

---

## Responsive Design

- Two-column layout: sticky sidebar + main content area
- Breakpoint at **900px**: sidebar narrows, grid collapses to one column
- Breakpoint at **600px**: layout stacks vertically, sidebar becomes static
- No CSS framework — all custom

---

## Bonus Objective

Planned future addition: e-commerce integration via Stripe checkout, Printify, or Etsy to sell prints and commissions.
