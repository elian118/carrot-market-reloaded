'use client';

import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

type ButtonProps = {
  text: string;
  src?: string;
  isLoading?: boolean;
  method?: 'post' | 'delete';
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
const Button = ({ text, src, isLoading, onClick, method = 'post' }: ButtonProps) => {
  const { pending } = useFormStatus();

  return isLoading ?? pending ? (
    <ArrowPathIcon className="size-12 animate-spin mx-auto dark:text-gray-100" />
  ) : (
    <button
      className={`px-6 w-fit mx-auto h-11 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed font-semibold active:scale-90 ${method === 'delete' ? 'delete-btn' : 'primary-btn'}`}
      disabled={isLoading ?? pending}
      onClick={onClick}
    >
      {src ? (
        <Link className="text-white" href={src}>
          {text}
        </Link>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
