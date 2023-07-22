import getRandomCharacter from "./get-random-character";

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

const generateRandomPassword = () => {
  const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
  const DIGIT_CHARS = "0123456789";
  const SPECIAL_CHARS = "!@#$%^&*";
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

export default generateRandomPassword;
