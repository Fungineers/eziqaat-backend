const getRandomCharacter = require("./get-random-character");

/**
 * This function shuffles a string. Works by
 * iteratively performing ```n``` swap operations
 * in a string of length ```n```
 * @param {string} string the string to shuffle
 * @returns {string} the shuffled string
 */
const shuffleString = (string) => {
  const shuffledString = string.split("");
  for (let i = shuffledString.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledString[i];
    shuffledString[i] = shuffledString[j];
    shuffledString[j] = temp;
  }
  return shuffledString.join("");
};

/**
 * This function generates a random password of length 8.
 * The password consists of alteast one lowercase, one uppercase,
 * one special character, and one number.
 * Example: ```qVR4!y&u```
 * @returns {string}
 */
const generateRandomPassword = () => {
  const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
  const DIGIT_CHARS = "0123456789";
  const SPECIAL_CHARS = "!#";
  const ALL_CHARS =
    UPPERCASE_CHARS + LOWERCASE_CHARS + DIGIT_CHARS + SPECIAL_CHARS;

  let randomString = "";

  // Generate at least one uppercase letter
  randomString += getRandomCharacter(UPPERCASE_CHARS);

  // Generate at least one lowercase letter
  randomString += getRandomCharacter(LOWERCASE_CHARS);

  // Generate at least one digit
  randomString += getRandomCharacter(DIGIT_CHARS);

  // Generate at least one special character
  randomString += getRandomCharacter(SPECIAL_CHARS);

  // Generate remaining characters
  for (let i = 4; i < 8; i++) {
    randomString += getRandomCharacter(ALL_CHARS);
  }

  // Shuffle the string to make it random
  randomString = shuffleString(randomString);

  return randomString;
};

module.exports = generateRandomPassword;
