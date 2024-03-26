'use client';

import { useFormStatus } from 'react-dom';

type ButtonProps = {
  text: string;
  method?: 'post' | 'delete';
};
const Button = ({ text, method = 'post' }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`px-6 h-11 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed font-semibold ${method === 'delete' ? 'delete-btn' : 'primary-btn'}`}
      disabled={pending}
    >
      {pending ? '로딩 중' : text}
    </button>
  );
};

export default Button;
