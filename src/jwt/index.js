const { getEnv } = require("../config");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports.verifyToken = (accessToken) => {
  return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
};
