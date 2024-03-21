'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <div className="absolute top-0 right-0 z-10">
        <div className="flex gap-2 *:p-2">
          <button
            className="bg-teal-500 dark:bg-gray-100 dark:text-gray-900 rounded-md"
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
          >
            {currentTheme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    )
  );
}
