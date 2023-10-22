// Servers/index.js
module.exports = (req, res) => {
  const responseData = {
    message: "Selamat datang di serverless function!",
    requestHeaders: req.headers,
    requestMethod: req.method,
    requestPath: req.url,
  };

  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify(responseData, null, 2));
};
