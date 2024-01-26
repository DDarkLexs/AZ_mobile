export const convertToCurrency = (number: number): string => {
  const formattedCurrency = Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    notation:'compact',
  }).format(number);

  return formattedCurrency; //.replace('AOA', 'Kwanza');
};
