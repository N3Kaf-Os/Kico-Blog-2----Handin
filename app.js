const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// make the public folder available
app.use(express.static(path.join(__dirname, "public")));

// fixed routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "gallery.html"));
});

app.get("/inspiration", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "inspiration.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "about.html"));
});

// simple artwork data
const artworks = {
  "hat-man": {
    title: "Hat Man",
    image:
      "https://i.pinimg.com/1200x/eb/fa/4a/ebfa4a4667230157177b24372eb94e22.jpg",
    description:
      "Black and white image of a man with a large hat and long coat.",
  },
  "grief-cigarette": {
    title: "Grief Cigarette",
    image:
      "https://i.pinimg.com/736x/07/79/23/0779236e597bede424ff6425b69f600f.jpg",
    description:
      "Black and white portrait of a man holding a cigarette and looking anxious.",
  },
  "always-watching": {
    title: "Always Watching",
    image:
      "https://i.pinimg.com/1200x/77/16/a7/7716a7c5bad51cbacf71bd55b53a1ace.jpg",
    description: "Black and white street image with a feeling of surveillance.",
  },
};

// dynamic route
app.get("/art/:slug", (req, res) => {
  const slug = req.params.slug;
  const artwork = artworks[slug];

  if (!artwork) {
    return res
      .status(404)
      .send("<h1>Artwork not found</h1><a href='/gallery'>Back to gallery</a>");
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${artwork.title}</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <main>
        <h1>${artwork.title}</h1>
        <img src="${artwork.image}" alt="${artwork.title}" style="max-width: 400px;">
        <p>${artwork.description}</p>
        <p><a href="/gallery">Back to gallery</a></p>
      </main>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
