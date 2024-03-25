import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeToggle } from '@/components/theme-toggle';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | 당근 마켓',
    default: '당근 마켓',
  },
  description: '무엇이든 사고 파세요!',
};

export default async function RootLayout({
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
