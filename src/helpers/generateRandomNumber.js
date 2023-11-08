export const generateRandomNumber = (limit) => {
  const randomIndex = Math.floor(Math.random() * limit);
  return randomIndex;
};