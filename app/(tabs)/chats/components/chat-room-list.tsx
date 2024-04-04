'use client';

import { formatToTimeAgo, parsePhotoUrl } from '@/libs/utils';
import Button from '@/components/button';
import { ChatRoomListProps } from '@/app/(tabs)/chats/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const ChatRoomList = ({ chatRoom, user }: ChatRoomListProps) => {
  const lastMsg = chatRoom!.messages[chatRoom!.messages.length - 1];
  const router = useRouter();
  const isUser = lastMsg.user.username === user.username;

  return (
    chatRoom && (
      <div className="hover:scale-x-105 transition">
        <div
          className={`${lastMsg.user_id !== user.id ? 'border-orange-500 border bg-orange-50 dark:bg-transparent' : 'bg-neutral-300 dark:bg-neutral-700'} rounded-xl mx-4 mb-1 mt-4 py-4 px-6 flex items-center justify-between`}
        >
          <div>
            <div className="flex gap-2 items-center h-6">
              {!isUser && (
                <Image
                  src={parsePhotoUrl(lastMsg.user.avatar)}
                  width={28}
                  height={28}
                  alt={lastMsg.user.username}
                  className="rounded-full bg-neutral-700 size-6"
                />
              )}
              <span className="text-sm">
                {isUser ? '나' : lastMsg.user.username}의 메시지
              </span>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <p className="truncate hover:text-ellipsis text-lg">
                {chatRoom.messages[chatRoom.messages.length - 1].payload}
              </p>
              <div className="text-sm rounded-lg bg-slate-500 py-[0.5px] px-2">
                {formatToTimeAgo(lastMsg.created_at.toString())}
              </div>
            </div>
          </div>
          <div className="w-28">
            <Button onClick={() => router.push(`/chats/${chatRoom.id}`)}>입장하기</Button>
          </div>
        </div>
        <span className="text-sm mr-8 max-w-screen-sm flex justify-end">
          {formatToTimeAgo(chatRoom.created_at.toString())} 개설
        </span>
      </div>
    )
  );
};

export default ChatRoomList;
