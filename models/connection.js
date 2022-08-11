const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_USER || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
});

module.exports = connection;