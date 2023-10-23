const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");

module.exports = async (req, res) => {
  try {
    // URL bisa ditentukan di lingkungan Vercel atau dari input request, jika dibutuhkan
    const url = "https://www.solopos.com/tag/olahraga-karanganyar"; // Gantilah dengan URL yang sesuai

    const response = await axios.get(url);

    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const newsList = [];

      $(".item").each((index, element) => {
        const imgSrc = $(element).find(".img img").attr("src");
        const category = $(element).find(".news-cat").text();
        const title = $(element).find(".title a").text();
        const link = $(element).find(".title a").attr("href");
        const description = $(element).find(".text").text();
        const date = $(element).find(".date").text().trim();
        const author = $(element).find(".author").text().trim();

        // Analisis sentimen pada deskripsi berita
        const sentimentAnalysis = new Sentiment();
        const sentimentResult = sentimentAnalysis.analyze(description);

        newsList.push({
          imgSrc,
          category,
          title,
          link,
          description,
          date,
          author,
          sentiment: sentimentResult,
        });
      });

      // Kirim respon dalam bentuk JSON
      res.json(newsList);
    } else {
      res.status(500).json({ error: "Gagal melakukan GET request" });
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
};
