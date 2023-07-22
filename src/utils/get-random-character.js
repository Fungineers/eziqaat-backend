const getRandomCharacter = (characters) => {
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

export default getRandomCharacter;
