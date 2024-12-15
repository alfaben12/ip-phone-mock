const express = require("express");
const fs = require("fs");
const path = require("path");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(require("body-parser").urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Welcome to mock!");
});

const filePath = path.join(__dirname, "data.json");
const data = fs.readFileSync(filePath, "utf-8");
const endpoints = JSON.parse(data);

function getResponse(req, res, data) {
  return res.status(200).json(data);
}

for (let i = 0; i < endpoints.length; i++) {
  const endpoint = endpoints[i].endpoint;
  const data = endpoints[i].data;

  app.post(endpoint, (req, res) => {
    return getResponse(req, res, data);
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
