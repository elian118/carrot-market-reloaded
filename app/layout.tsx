import type { Metadata } from 'next';
import { Roboto, Rubik_Scribble, Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeToggle } from '@/components/theme-toggle';
import { ThemeProvider } from 'next-themes';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--roboto-text',
});

const rubik = Rubik_Scribble({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
  variable: '--rubik-text',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--noto-sans-kr',
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  variable: '--noto-serif-kr',
});

const nanumGothic = localFont({
  src: '../public/fonts/NanumGothic-Regular.ttf',
  variable: '--nanum-gothic',
});

const metalica = localFont({
  src: '../public/fonts/Metalica.ttf',
  variable: '--metalica',
});

export const metadata: Metadata = {
  title: {
    template: '%s , 당근 마켓',
    default: '당근 마켓',
  },
  description: '무엇이든 사고 파세요!',
};

export default async function RootLayout({
  dial,
  children,
}: Readonly<{
  dial: React.ReactNode;
  children: React.ReactNode;
}>) {
  // console.log(roboto);
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${rubik.variable} ${nanumGothic.variable} ${metalica.variable} ${notoSansKr.variable} ${notoSerifKr.variable} bg-gray-100 dark:bg-gray-800 max-w-screen-sm mx-auto`}
        // style={roboto.style}
      >
        <ThemeProvider enableSystem attribute="class">
          <ThemeToggle />
          {children}
          {dial}
        </ThemeProvider>
      </body>
    </html>
  );
}
