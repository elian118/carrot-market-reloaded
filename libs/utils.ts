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

export const setQueryLog = (roll: string, caller: string, result?: object | null) => {
  db.$on('query', (e) => {
    console.log(
      chalk.black(chalk.bgCyan(`🔎🔎🔎  caller: ${caller} / roll: ${roll} 🔎🔎🔎`)),
    );
    console.log(`${chalk.cyan('Query: ')}${e.query}`);
    console.log(`${chalk.blue('Params: ')}${e.params}`);
    console.log(
      `${chalk.yellow('Duration: ')}${e.duration}ms ${e.duration >= 2 ? chalk.red('Too Lazy') : chalk.green('Good')}`,
    );
    result && console.log(`${chalk.cyan('Result:')} ${JSON.stringify(result, null, 2)}`);
    console.log(chalk.black(chalk.bgCyan(`🎉🎉🎉  DONE! 🎉🎉🎉`)));
  });
};
