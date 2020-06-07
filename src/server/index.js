const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const cors = require("cors");
const pool = require("../database/db.js");

app.use(bodyParser.json());
app.use(cors());

app.post("/transactions", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(amount);
    const newTransaction = await pool.query(
      "INSERT INTO transactions (amount) VALUES($1)",
      [amount]
    );
    console.log(res.json(newTransaction));
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/types", async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const newTransactionType = await pool.query(
      "INSERT INTO transaction_types (name) VALUES($1)",
      [name]
    );
    console.log(res.json(newTransactionType));
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/types", async (req, res) => {
  const types = await pool.query("SELECT * FROM transaction_types");
  res.json(types);
});

app.listen(PORT);
