import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeToggle } from '@/components/theme-toggle';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '당근 마켓',
  description: '당근 마켓에 어서오세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-800 max-w-screen-sm mx-auto`}
      >
        <ThemeProvider enableSystem attribute="class">
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
