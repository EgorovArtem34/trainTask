export const createPageNumbers = (values: number, valuesPerPage: number) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(values / valuesPerPage); i += 1) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};
