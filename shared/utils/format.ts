export const formatNumber = (num: string | number) => {
  if (num === 0) {
    return num;
  }

  const [integerPart, fractionalPart] = num.toString().split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};
