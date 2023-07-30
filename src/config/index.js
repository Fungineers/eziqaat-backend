const { config } = require("dotenv");

/**
 * Configure the environment variables in advance
 * This allows to directly access the enviroment variable
 */
config();

/**
 * Each time a reference is made through this function,
 * it will return the value of environment variable as it is
 * @param {string} variableName
 * @returns {string}
 */
const getEnv = (variableName) => {
  return process.env[variableName];
};

module.exports = { getEnv };
