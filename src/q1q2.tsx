//function that removes all odd numbers from an array
const removeOddNum = (arr: number[]): number[] => {
  return arr.filter((num) => num % 2 === 0);
};

const sumOfOddNum = (arr: number[]): number => {
  const filteredNums = removeOddNum(arr);
  return filteredNums.reduce((acc, cur) => acc + cur, 0);
};
