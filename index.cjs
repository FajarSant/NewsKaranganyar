const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const HotNewsControllers = require("./Controllers/HotNewsControllers"); // Pastikan path ke HotNewsControllers sesuai
const ListNewsControllers = require("./Controllers/ListNewsControllers"); // Pastikan path ke HotNewsControllers sesuai
const OlahragaControllers = require("./Controllers/OlahragaControllers"); // Pastikan path ke HotNewsControllers sesuai
const PendidikanControllers = require("./Controllers/PendidikanControllers"); // Pastikan path ke HotNewsControllers sesuai
const PertanianControllers = require("./Controllers/PertanianControllers"); // Pastikan path ke HotNewsControllers sesuai

// Middleware untuk mengizinkan permintaan lintas domain (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Rute untuk mendapatkan daftar berita
app.get("/HotNews", async (req, res) => {
  try {
    const url =
      "https://www.detik.com/tag/bupati-karanganyar?tag_from=karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await HotNewsControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});

app.get("/List", async (req, res) => {
  try {
    const url = "https://soloraya.solopos.com/karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await ListNewsControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});
app.get("/Pendidikan", async (req, res) => {
  try {
    const url = "https://www.solopos.com/tag/pendidikan-karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await PendidikanControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});
app.get("/Pertanian", async (req, res) => {
  try {
    const url = "https://www.solopos.com/tag/pertanian-karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await PertanianControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});
app.get("/Sport", async (req, res) => {
  try {
    const url = "https://www.solopos.com/tag/sarana-olahraga-karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await OlahragaControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});

// Rute akar
app.get("/", (req, res) => {
  res.send("Selamat datang di server backend.");
});

app.listen(port, () => {
  console.log(`Server backend is running on port ${port}`);
});
