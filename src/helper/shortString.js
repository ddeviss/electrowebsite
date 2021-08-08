export const shortString = (value, number = 70) => {
  return value.length > number ? value.slice(0, number) : value;
};
