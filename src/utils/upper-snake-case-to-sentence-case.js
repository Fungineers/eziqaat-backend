/**
 * This function converts upper snake case to sentence case.
 * For Example, ```HELLO_WORLD => Hello World```
 * @param {string} inputString in snake case
 * @returns {string} sentence case output
 */
const upperSnakeCaseToSentenceCase = (inputString) => {
  // Replace underscores with spaces
  const stringWithSpaces = inputString.toLowerCase().replace(/_/g, " ");

  // Split the string into words
  const words = stringWithSpaces.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back together with spaces
  const sentenceCaseString = capitalizedWords.join(" ");

  return sentenceCaseString;
};

module.exports = upperSnakeCaseToSentenceCase;
