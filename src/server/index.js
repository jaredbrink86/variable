const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../app/database/db.js');
const cors = require('cors');
const { readJsonConfigFile } = require('typescript');

const PORT = 4000;
const _app_folder = 'dist/variable';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get(express.static(_app_folder));

// app.all("*", function (req, res) {
//   res.status(200).sendFile(`/`, { root: _app_folder });
// });

app.get('/', async (req, res) => {
  try {
    res.json('hello world');
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    res.json(categories.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const transactions = await pool.query(`
    SELECT t.id, t.transaction_date, c.category, t.transaction_amount 
    FROM transactions AS t
    INNER JOIN categories AS c
    ON t.category_id = c.id`);
    res.status(200);
    res.json(transactions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/categories', async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = await pool.query(
      'INSERT INTO categories (category) VALUES($1)',
      [category]
    );
    res.status(200);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/transactions', async (req, res) => {
  try {
    const transactionAmount = req.body.amount;
    const transactionDate = req.body.date;
    const category = await pool.query(
      `SELECT id FROM categories where category = '${req.body.category}'`
    );
    const newTransaction = await pool.query(
      'INSERT INTO transactions (transaction_date, category_id, transaction_amount) VALUES($1, $2, $3)',
      [transactionDate, category.rows[0].id, transactionAmount]
    );
    res.status(200);
    res.json(newTransaction);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/transactions/:id', async (req, res) => {
  try {
    await pool.query(`DELETE FROM transactions WHERE id = ${req.body.id}`);
    res.status(200);
    res.json('Transaction Deleted');
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/transactions/:id/edit', async (req, res) => {
  try {
    const category = await pool.query(
      `SELECT id FROM categories where category = '${req.body.category}'`
    );
    const categoryId = category.rows[0].id;
    console.log(req.body.id);
    console.log(req.body.transactionAmount);
    console.log(req.body.date);
    console.log(categoryId);
    await pool.query(
      `UPDATE transactions SET transaction_date = '${req.body.date}', category_id = '${categoryId}', transaction_amount = '${req.body.transactionAmount}' WHERE id = ${req.body.id}`
    );
    res.json('Transaction Updated');
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(
    `Node Express servoer for ${app.name} listening on http://localhost:${PORT}`
  );
});
