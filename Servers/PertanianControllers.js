const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");

const PertanianControllers = async (req, res) => {
  try {
    const url = "https://www.solopos.com/tag/pertanian-karanganyar";

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const breakingNewsItems = $(".sp-list-breaking .item");

    const beritaData = [];

    breakingNewsItems.each((index, element) => {
      const imgSrc = $(element).find(".img img").attr("src");
      const category = $(element).find(".news-cat").text();
      const title = $(element).find(".title a").text();
      const link = $(element).find(".title a").attr("href");
      const description = $(element).find(".text").text();
      const date = $(element).find(".date ").text();
      const author = $(element).find(".author").text();

      const sentimentAnalysis = new Sentiment();
      const sentimentResult = sentimentAnalysis.analyze(description);

      const berita = {
        imgSrc,
        category,
        title,
        link,
        description,
        date,
        author,
        sentiment: sentimentResult,
      };

      beritaData.push(berita);
    });

    res.json(beritaData);
  } catch (error) {
    console.error("Gagal mengambil halaman web:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
};

module.exports = {
  PertanianConteollers,
};
