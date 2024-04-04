'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import IconButton from '@/components/icon-button';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { clearEmptyChatRoom } from '@/app/chats/[id]/services';

export const GoBackBtn = () => {
  const params = useParams();
  const router = useRouter();

  const goBack = async () => {
    typeof params.id === 'string' && (await clearEmptyChatRoom(params.id));
    router.back();
  };

  return (
    <IconButton
      onClick={goBack}
      className="absolute top-6 right-8 rounded-full border-2 border-gray-900 dark:border-white size-10 p-2 active:scale-95"
      icon={<ArrowLeftIcon />}
    />
  );
};
