require("dotenv").config();
const mongoose = require("mongoose");
const Artwork = require("./models/Artwork");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/kico-blog";

const artworks = [
  {
    title: "Hat Man",
    slug: "hat-man",
    imageUrl: "https://i.pinimg.com/1200x/eb/fa/4a/ebfa4a4667230157177b24372eb94e22.jpg",
    description: "Black and white image of a man posing against the wind, face hidden by a large hat, long coat and oversized pants.",
    medium: "Digital",
    artDate: new Date("2026-02-24"),
  },
  {
    title: "Grief Cigarette",
    slug: "grief-cigarette",
    imageUrl: "https://i.pinimg.com/736x/07/79/23/0779236e597bede424ff6425b69f600f.jpg",
    description: "Man holding cigarette, visibly anxious, man in grief.",
    medium: "Analog",
    artDate: new Date("2026-02-24"),
  },
  {
    title: "Always Watching",
    slug: "always-watching",
    imageUrl: "https://i.pinimg.com/1200x/77/16/a7/7716a7c5bad51cbacf71bd55b53a1ace.jpg",
    description: "Black and white street photography; feeling of being observed, dystopia, big brother is always watching, 1984.",
    medium: "Analog",
    artDate: new Date("2026-02-24"),
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Artwork.deleteMany({});
  await Artwork.insertMany(artworks);
  console.log("Seeded", artworks.length, "artworks");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
