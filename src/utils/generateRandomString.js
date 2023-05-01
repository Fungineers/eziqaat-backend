/**
 * Generates a random string of alphanumeric
 * characters of given length
 * @param {number} length
 * @returns {string}
 */
const generateRandomString = (length) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let string = "";
  for (let i = 0; i < length; i++) {
    const charIndex = Math.floor(Math.random() * chars.length);
    const char = chars[charIndex];
    string += char;
  }
  return string;
};

export default generateRandomString;
