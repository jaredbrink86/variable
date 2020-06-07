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
    const transaction = req.body;
    //TODO use type to find foreign key id and store in variable to add to insert query
    const typeId = await pool.query(
      `SELECT id FROM transaction_type WHERE (name = ${transaction.type})`
    );
    const newTransaction = await pool.query(
      "INSERT INTO transactions (transaction.amount) VALUES($1)",
      [amount]
    );
    console.log(res.json(newTransaction));
    res.json(transaction);
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
  try {
    const types = await pool.query("SELECT * FROM transaction_types");
    res.json(types.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await pool.query("SELECT * FROM transactions");
    res.json(transactions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT);
