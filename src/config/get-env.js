import { config } from "dotenv";

config();

const getEnv = (key) => {
  return process.env[key];
};

export default getEnv;
