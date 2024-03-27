'use client';

import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

type ButtonProps = {
  icon: React.ReactNode;
  href?: string;
  isLoading?: boolean;
  method?: 'post' | 'delete';
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
const IconButton = ({ icon, href, isLoading, onClick, method = 'post' }: ButtonProps) => {
  const { pending } = useFormStatus();

  return isLoading ?? pending ? (
    <ArrowPathIcon className="size-12 animate-spin mx-auto dark:text-gray-100" />
  ) : (
    <button
      className={`bg-orange-500 hover:bg-orange-400 active:scale-95 rounded-full flex items-center justify-center size-16 text-white ${method === 'delete' ? 'delete-btn' : 'primary-btn'}`}
      disabled={isLoading ?? pending}
      onClick={onClick}
    >
      {href ? (
        <Link className="text-white" href={href}>
          {icon}
        </Link>
      ) : (
        icon
      )}
    </button>
  );
};

export default IconButton;
