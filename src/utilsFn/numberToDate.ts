export const numberToDate = (dateNumber: number) => {
  const year = Math.floor(dateNumber / 10000);
  const month = Math.floor((dateNumber % 10000) / 100) - 1;
  const day = dateNumber % 100;

  const date = new Date(year, month, day);
  return date;
};
