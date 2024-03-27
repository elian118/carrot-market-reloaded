import db from '@/libs/db';
import chalk from 'chalk';

export const formatToTimeAgo = (date: string): string => {
  const dayInMs = 1000 * 60 * 60 * 24;

  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat('ko');
  const isToday = formatter.format(diff, 'days') === '0일 후';
  return isToday ? '오늘' : formatter.format(diff, 'days');
};

export const formatToWon = (price: number): string =>
  // `₩ ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  `₩ ${price.toLocaleString('ko-KR')}`;

export const setQueryLog = (info: string) => {
  db.$on('query', (e) => {
    console.log(chalk.black(chalk.bgCyan(`============> ${info} <============`)));
    console.log(`${chalk.cyan('Query: ')}${e.query}`);
    console.log(`${chalk.green('Params: ')}${e.params}`);
    console.log(`${chalk.yellow('Duration: ')}${e.duration}ms`);
  });
};
