import { config } from "dotenv";
import { createConnection } from "mysql";
import * as queries from "./queries";

config();

const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;
const database = process.env.MYSQL_DB;

const connectionString = `mysql://${user}:${password}@${host}:${port}/${database}`;

export const connection = createConnection(connectionString);

export const connectDb = () => {
  connection.connect((error) => {
    if (error) {
      throw error;
    }
    console.log(
      `⚡ Connected to DB '${database}' on '${host}:${port}' via user '${user}'`
    );
  });
};

export { queries };
