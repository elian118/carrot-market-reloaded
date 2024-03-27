'use client';

import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

type ButtonProps = {
  children: React.ReactNode | string;
  icon?: React.ReactNode;
  type?: 'button' | 'reset' | 'submit';
  href?: string;
  isLoading?: boolean;
  method?: 'post' | 'delete';
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
const Button = ({
  children,
  icon,
  type = 'button',
  href,
  isLoading,
  onClick,
  method = 'post',
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return isLoading ?? pending ? (
    <ArrowPathIcon className="size-12 animate-spin mx-auto dark:text-gray-100" />
  ) : (
    <button
      type={type}
      className={`px-6 w-fit mx-auto h-11 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed font-semibold active:scale-90 ${method === 'delete' ? 'delete-btn' : 'primary-btn'}`}
      disabled={isLoading ?? pending}
      onClick={onClick}
    >
      {href ? (
        <Link className="flex items-center justify-between gap-2" href={href}>
          {icon && icon}
          {children}
        </Link>
      ) : (
        <div className="flex items-center justify-between gap-2">
          {icon && icon}
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;
