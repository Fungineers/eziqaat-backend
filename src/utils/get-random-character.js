/**
 * This function selects a random character from a string
 * @param {string} characters a string of possible characters
 * @returns {string} the randomly selected character
 */
const getRandomCharacter = (characters) => {
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

module.exports = getRandomCharacter;
