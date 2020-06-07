const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.listen(PORT);
