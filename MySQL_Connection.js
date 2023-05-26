const MySQL = require("mysql");

const connection = MySQL.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "taskkeeper",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL successfully");
});

module.exports = connection;
