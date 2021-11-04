export const getRandomElements = (array, numOfElems = 2) =>
  [...array].sort(() => Math.random() - 0.5).slice(0, numOfElems);
