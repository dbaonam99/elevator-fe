/* eslint-disable import/prefer-default-export */
export const generateFloors = (num: number) =>
  new Array(num)
    .fill(null)
    .map((_, index) => ({ id: index + 1 }))
    .reverse();
