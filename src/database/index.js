import { config } from "dotenv";
import { createConnection } from "mysql2/promise";

config();

const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;
const database = process.env.MYSQL_DB;

class DB {
  constructor() {
    this.connection = createConnection({
      host,
      port,
      user,
      password,
      database,
    });
  }

  async connect() {
    const connection = await this.connection;
    const { host, port, user, database } = connection.config;
    connection
      .connect()
      .then(() => {
        console.log(
          `⚡ Connect to DB "${database}" via user "${user}" on ${host}:${port}`
        );
      })
      .catch((error) => {
        throw error;
      });
  }

  async createUser({
    firstName,
    lastName,
    email,
    role,
    phone,
    cnic,
    password,
  }) {
    const connection = await this.connection;
    const sql = `CALL CREATE_USER(?, ?, ?, ?, ?, ?, ?)`;
    const params = [firstName, lastName, email, role, phone, cnic, password];
    return connection.query(sql, params);
  }

  async verifyCredentials({ credential, password, platform }) {
    const connection = await this.connection;
    const sql = `CALL VERIFY_CREDENTIALS(?, ?, ?)`;
    const params = [credential, password, platform];
    return connection.query(sql, params);
  }

  async getUserById({ id }) {
    const connection = await this.connection;
    const sql = `SELECT * FROM user_data WHERE id = ?`;
    const params = [id];
    return connection.query(sql, params);
  }
}

const db = new DB();

export default db;
