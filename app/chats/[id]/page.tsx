import React from 'react';
import { enterRoom, getMessages } from '@/app/chats/[id]/services';
import { notFound } from 'next/navigation';
import ChatMessageList from '@/components/chat-message-list';
import { getUser } from '@/libs/session';

const ChatRoom = async ({ params }: { params: { id: string } }) => {
  const room = await enterRoom(params.id);
  const initialMessages = await getMessages(params.id);
  const user = await getUser();

  console.log(initialMessages);
  if (!room) return notFound();

  return <ChatMessageList initialMessages={initialMessages} userId={user.id} />;
};

export default ChatRoom;
