export const monthToDay = (currentYear: number) => {
  return new Map<number, number>([
    [1, 31],
    [2, currentYear % 4 ? 28 : 29],
    [3, 31],
    [4, 30],
    [5, 31],
    [6, 30],
    [7, 31],
    [8, 31],
    [9, 30],
    [10, 31],
    [11, 30],
    [12, 31],
  ]);
};
