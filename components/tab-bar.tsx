'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tabs } from '@/app/(tabs)/constants';

const TabBar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full max-w-screen-sm mx-auto grid grid-cols-5 border-neutral-600 border-t px-5 py-3 dark:*:text-white *:text-orange-500 bg-gray-100 dark:bg-gray-800 transition-colors">
      {tabs.map((tab, idx) => (
        <Link key={idx} href={tab.link} className="flex flex-col items-center gap-px">
          {pathname === tab.link ? tab.selectedIcon : tab.icon}
          <span>{tab.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default TabBar;
