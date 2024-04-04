'use client';

import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { InitialMessages, Message } from '@/app/chats/[id]/types';
import { RealtimeChannel } from '@supabase/realtime-js';
import { saveMessage } from '@/app/chats/[id]/services';

export const useChats = () => {
  const [messages, setMessages] = useState<InitialMessages>([]);
  const [message, setMessage] = useState<string>('');
  const channel = useRef<RealtimeChannel>();

  const isUser = (message: Message, userId: number) => message.user_id === userId;

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    params: {
      userId: number;
      username: string;
      avatar: string | null;
      chatRoomId: string;
    },
  ) => {
    e.preventDefault();
    const { userId, username, avatar, chatRoomId } = params;

    const sendMessage = {
      id: Date.now(),
      payload: message,
      created_at: new Date(),
      user_id: userId,
      user: { username, avatar },
    };

    channel.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: sendMessage,
    });
    // 본인 메시지 로그 갱신
    setMessages((prevMsgs) => [...prevMsgs, sendMessage]);
    await saveMessage(message, chatRoomId);
    setMessage('');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

  return { isUser, message, messages, setMessages, onChange, channel, onSubmit };
};
