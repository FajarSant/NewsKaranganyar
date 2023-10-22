const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

// Middleware untuk mengizinkan permintaan lintas domain (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});


// Rute akar
app.get("/", (req, res) => {
  res.send("Selamat datang di server backend.");
});

app.listen(port, () => {
  console.log(`Server backend is running on port ${port}`);
});
