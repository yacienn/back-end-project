const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nitche",
  password: "yacine",
  port: 5432,
});

module.exports = pool;
