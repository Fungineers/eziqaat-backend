import { config } from "dotenv";
import * as jwt from "jsonwebtoken";

config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const generateToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (accessToken) => {
  return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
};
