const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bank",
});

module.exports = connection.promise();