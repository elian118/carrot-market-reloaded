import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'var(--roboto-text)',
        rubik: 'var(--rubik-text)',
        nanumgothic: 'var(--nanum-gothic)',
        metalica: 'var(--metalica)',
        notosanskr: 'var(--noto-sans-kr)',
        notoserifkr: 'var(--noto-serif-kr)',
      },
      margin: {
        tomato: '120px',
      },
      borderRadius: {
        'sexy-name': '11.11px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
