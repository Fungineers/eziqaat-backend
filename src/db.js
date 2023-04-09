const env = require("dotenv");
const mysql = require("mysql");

env.config();

const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;
const database = process.env.MYSQL_DB;

const connectionString = `mysql://${user}:${password}@${host}:${port}/${database}`;

const connection = mysql.createConnection(connectionString);

const connectDb = () => {
  connection.connect((error) => {
    if (error) {
      throw error;
    }
    console.log(
      `⚡ Connected to DB '${database}' on '${host}:${port}' via user '${user}'`
    );
  });
};

module.exports = { connection, connectDb };
