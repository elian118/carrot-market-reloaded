import React from 'react';
import { enterRoom } from '@/app/chats/[id]/services';
import { notFound } from 'next/navigation';

const ChatRoom = async ({ params }: { params: { id: string } }) => {
  const room = await enterRoom(params.id);

  if (!room) return notFound();

  return <div>chat!</div>;
};

export default ChatRoom;
