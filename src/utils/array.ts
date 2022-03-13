export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

export const swapArr = (arr: any[], i: number, j: number) => {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
};

export const shuffleArr = (source: any[]) => {
  const arr = source.slice();
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i);
    swapArr(arr, i, j);
  }
  return arr;
};
