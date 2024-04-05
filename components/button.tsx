'use client';

import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { ButtonProps } from '@/libs/types';

const Button = ({
  children,
  icon,
  type = 'button',
  href,
  isLoading,
  onClick,
  rounded,
  outlined,
  method = 'post',
  fullWidth = false,
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return isLoading ?? pending ? (
    <ArrowPathIcon className="size-10 animate-spin mx-auto dark:text-gray-100" />
  ) : (
    <button
      type={type}
      className={`px-6 ${fullWidth ? 'w-full flex justify-center items-center' : 'w-fit'} ${!fullWidth && 'mx-auto'} h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed font-semibold active:scale-90 ${method === 'delete' ? 'delete-btn' : 'primary-btn'} ${rounded && 'rounded-full'} ${outlined && 'bg-transparent border border-orange-400 *:text-orange-400 *:font-medium *:hover:font-semibold *:hover:text-white'}`}
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
