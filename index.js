const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(require("body-parser").urlencoded({ extended: false }));

const pathFile = path.join(process.cwd(), "/", "data.json");

const endpoints = JSON.parse(fs.readFileSync(pathFile, "utf8"));
app.get("/", (req, res) => {
  res.send("Welcome to mock!");
});

function getResponse(req, res, data) {
  return res.status(200).json(data);
}

for (let i = 0; i < endpoints.length; i++) {
  const endpoint = endpoints[i].endpoint;
  const method = endpoints[i].method;
  const data = endpoints[i].data;

  if (method == "POST") {
    app.post(endpoint, (req, res) => {
      console.log("post body is " + JSON.stringify(req.body));
      return getResponse(req, res, data);
    });
  } else if (method == "PUT") {
    console.log("put body is " + JSON.stringify(req.body));
    app.put(endpoint, (req, res) => {
      return getResponse(req, res, data);
    });
  } else if (method == "GET") {
    app.get(endpoint, (req, res) => {
      return getResponse(req, res, data);
    });
  } else if (method == "DELETE") {
    app.delete(endpoint, (req, res) => {
      return getResponse(req, res, data);
    });
  } else {
    app.post(endpoint, (req, res) => {
      return getResponse(req, res, data);
    });
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
