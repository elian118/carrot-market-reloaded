'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <div className="fixed top-4 right-4 z-10">
        <div className="flex flex-col gap-2 *:rounded-full *:size-6">
          <button
            className="text-gray-900 dark:text-white rounded-md"
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
          >
            {currentTheme === 'dark' ? (
              <MoonIcon className="hover:text-orange-600" />
            ) : (
              <SunIcon className="hover:text-orange-600" />
            )}
          </button>
        </div>
      </div>
    )
  );
}
