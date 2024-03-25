export const getCurrencyFormat = (number: number) =>
  `₩ ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
