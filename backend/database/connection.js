const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "bank",
});

module.exports = connection.promise();