import getEnv from "@/config/get-env";
import * as jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");

export const generateToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (accessToken) => {
  return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
};
