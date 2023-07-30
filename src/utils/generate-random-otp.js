const getRandomCharacter = require("./get-random-character");

/**
 * This function returns a random 4 digit OTP.
 * Example: ```4867```
 * @returns {string} a random string of 4 digits
 */
const generateRandomOTP = () => {
  const DIGIT_CHARS = "0123456789";

  let randomString = "";

  // Generate remaining characters
  for (let i = 0; i < 4; i++) {
    randomString += getRandomCharacter(DIGIT_CHARS);
  }

  return randomString;
};

module.exports = generateRandomOTP;
