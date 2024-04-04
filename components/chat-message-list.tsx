'use client';

import { InitialMessages, Message } from '@/app/chats/[id]/types';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { formatToTimeAgo, parsePhotoUrl } from '@/libs/utils';
import Image from 'next/image';
import IconButton from '@/components/icon-button';
import { ArrowSmallUpIcon } from '@heroicons/react/20/solid';
import { createClient } from '@supabase/supabase-js';
import { RealtimeChannel } from '@supabase/realtime-js';

type ChatMessageListProps = {
  chatRoomId: string;
  initialMessages: InitialMessages;
  userId: number;
};

const ChatMessageList = ({
  chatRoomId,
  initialMessages,
  userId,
}: ChatMessageListProps) => {
  const [messages, setMessages] = useState<InitialMessages>(initialMessages);
  const [message, setMessage] = useState<string>('');
  const channel = useRef<RealtimeChannel>();

  const isUser = (message: Message) => message.user_id === userId;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages((prevMsg) => [
      ...prevMsg,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        user_id: userId,
        user: { username: 'string', avatar: 'xxxx' },
      },
    ]);

    channel.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: { message },
    });
    setMessage('');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPERBASE_URL!,
      process.env.NEXT_PUBLIC_SUPERBASE_PUBLIC_API_KEY!,
    );
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on('broadcast', { event: 'message' }, (payload) => {
        console.log(payload);
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe(); // 채널구독 종료 - 자원 반환
    };
  }, [chatRoomId]);

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
      <form className="flex relative" onSubmit={onSubmit}>
        <input
          name="message"
          className="bg-neutral-200 dark:bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-orange-200 dark:ring-neutral-200 focus:ring-orange-300 dark:focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          required
          onChange={onChange}
          value={message}
        />
        <IconButton
          type="submit"
          className="absolute right-1.5 top-1.5"
          icon={
            <ArrowSmallUpIcon className="dark:text-gray-900 size-7 rounded-full bg-orange-500" />
          }
        />
      </form>
    </div>
  );
};

export default ChatMessageList;
