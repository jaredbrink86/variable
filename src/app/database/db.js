const Pool = require("pg").Pool;

const pool = new Pool({
  user: "jaredbrink",
  host: "localhost",
  database: "variable",
  port: 5432,
});

module.exports = pool;
