const express = require("express");
const router = express.Router();
const HotNews = require("../Controllers/HotNewsControllers"); // Mengimpor controller sebagai fungsi

// Rute untuk mendapatkan data berita
router.get("/HotNews", async (req, res) => {
  const url = "https://www.detik.com/tag/bupati-karanganyar?tag_from=karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
  HotNews(res, url); // Memanggil HotNews sebagai fungsi
});

module.exports = HotNews;
