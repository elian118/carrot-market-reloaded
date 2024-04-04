'use client';

import { InitialMessages, Message } from '@/app/chats/[id]/types';
import { useState } from 'react';
import { formatToTimeAgo, parsePhotoUrl } from '@/libs/utils';
import Image from 'next/image';

type ChatMessageListProps = {
  initialMessages: InitialMessages;
  userId: number;
};

const ChatMessageList = ({ initialMessages, userId }: ChatMessageListProps) => {
  const [messages, setMessages] = useState<InitialMessages>(initialMessages);

  const isUser = (message: Message) => message.user_id === userId;

  return (
    <div className="p-5 flex flex-col gap-5 overflow-y-auto min-h-screen justify-end">
      {messages.length > 0 &&
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 items-start ${isUser(message) && 'justify-end'}`}
          >
            {!isUser(message) && (
              <Image
                className="object-fill rounded-full size-8"
                width={50}
                height={50}
                src={parsePhotoUrl(message.user.avatar, 'avatar')}
                alt={message.user.username}
              />
            )}
            <div className={`flex flex-col gap-1 ${isUser(message) && 'items-end'}`}>
              <span
                className={`${!isUser(message) ? 'bg-neutral-500' : 'bg-orange-500'} p-2.5 rounded-md`}
              >
                {message.payload}
              </span>
              <span className="text-xs">
                {formatToTimeAgo(message.created_at.toString())}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatMessageList;
