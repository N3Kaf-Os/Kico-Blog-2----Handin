require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Artwork = require("./models/Artwork");

const app = express();
const PORT = 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/kico-blog";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ── Public routes ────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/gallery", async (req, res) => {
  const artworks = await Artwork.find().sort({ artDate: -1 });
  res.render("gallery", { artworks });
});

app.get("/art/:slug", async (req, res) => {
  const artwork = await Artwork.findOne({ slug: req.params.slug });
  if (!artwork) {
    return res.status(404).render("404");
  }
  res.render("artwork", { artwork });
});

app.get("/inspiration", (req, res) => {
  res.render("inspiration");
});

app.get("/about", (req, res) => {
  res.render("about");
});

// ── Admin routes (CRUD) ──────────────────────────────────────────

app.get("/admin", async (req, res) => {
  const artworks = await Artwork.find().sort({ artDate: -1 });
  res.render("admin/index", { artworks });
});

app.get("/admin/new", (req, res) => {
  res.render("admin/new");
});

app.post("/admin", async (req, res) => {
  const { title, slug, imageUrl, description, medium, artDate } = req.body;
  await Artwork.create({ title, slug, imageUrl, description, medium, artDate });
  res.redirect("/admin");
});

app.get("/admin/:id/edit", async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);
  if (!artwork) return res.redirect("/admin");
  res.render("admin/edit", { artwork });
});

app.put("/admin/:id", async (req, res) => {
  const { title, slug, imageUrl, description, medium, artDate } = req.body;
  await Artwork.findByIdAndUpdate(req.params.id, {
    title,
    slug,
    imageUrl,
    description,
    medium,
    artDate,
  });
  res.redirect("/admin");
});

app.delete("/admin/:id", async (req, res) => {
  await Artwork.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

// ── 404 fallback ─────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
