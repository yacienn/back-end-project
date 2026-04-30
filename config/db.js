const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nithce",
  password: "yacine",
  port: 5432,
});

module.exports = pool;