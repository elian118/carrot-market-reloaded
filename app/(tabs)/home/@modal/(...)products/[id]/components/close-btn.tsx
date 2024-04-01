'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export const CloseBtn = () => {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  return (
    <div>
      <button onClick={onClickClose}>
        <XMarkIcon className="size-10" />
      </button>
    </div>
  );
};
