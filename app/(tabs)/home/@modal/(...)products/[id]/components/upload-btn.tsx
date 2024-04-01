'use client';

import { Pencil1Icon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export const EditBtn = ({ id }: { id: string }) => {
  const router = useRouter();

  const onClickEdit = () => {
    router.push(`/home/update/${id}`);
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div>
      <button onClick={onClickEdit}>
        <Pencil1Icon className="size-10" />
      </button>
    </div>
  );
};
