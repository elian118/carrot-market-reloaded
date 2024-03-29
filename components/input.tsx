import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

type InputProps = {
  name: string; // 필수속성화
  errors?: string[];
};

const _Input = (
  { name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        name={name}
        className="bg-transparent rounded-md w-full h-10 outline-none ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
        {...rest}
      />
      {errors?.map((err, idx) => (
        <span key={idx} className="text-red-500 font-medium">
          {err}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
