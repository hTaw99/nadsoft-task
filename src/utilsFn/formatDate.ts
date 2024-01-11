export function formatDate(dateNumber: number) {
  const year = dateNumber.toString().substring(0, 4);
  const month = dateNumber.toString().substring(4, 6).padStart(2, "0");
  const day = dateNumber.toString().substring(6, 8).padStart(2, "0");

  return `${day}/${month}/${year}`;
}


export const numberToDate = (dateNumber: number) => {
  const year = Math.floor(dateNumber / 10000);
  const month = Math.floor((dateNumber % 10000) / 100) - 1;
  const day = dateNumber % 100;

  const date = new Date(year, month, day);
  return date;
};


export const dateToNumber = (date: Date) => {
  const formattedDate =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0");
  return Number(formattedDate);
};
