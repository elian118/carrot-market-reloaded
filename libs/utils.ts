export const formatToTimeAgo = (date: string): string => {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat('ko');
  return formatter.format(diff, 'days');
};

export const formatToWon = (price: number): string =>
  // `₩ ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  `₩ ${price.toLocaleString('ko-KR')}`;
