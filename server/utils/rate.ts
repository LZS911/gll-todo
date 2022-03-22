export const calcRate = (sum: number, ...arr: number[]) => {
  if (sum === 0) {
    return Array.from({ length: arr.length }, () => 0);
  }
  const res: number[] = [];
  const getSum = (_arr: number[]) => {
    return _arr.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  };
  arr.forEach((item, index) => {
    if (index === arr.length - 1) {
      res.push(1 - (getSum(res) > 1 ? 1 : getSum(res)));
    }
    res.push(item / sum);
  });

  return res.map((item) => Number((item * 100).toFixed(2)));
};
