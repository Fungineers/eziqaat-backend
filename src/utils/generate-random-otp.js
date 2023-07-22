import getRandomCharacter from "./get-random-character";

const generateRandomOTP = () => {
  const DIGIT_CHARS = "0123456789";

  let randomString = "";

  // Generate remaining characters
  for (let i = 0; i < 4; i++) {
    randomString += getRandomCharacter(DIGIT_CHARS);
  }

  return randomString;
};

export default generateRandomOTP;
