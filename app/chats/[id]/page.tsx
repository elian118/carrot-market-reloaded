import React from 'react';
import { enterRoom, getMessages } from '@/app/chats/[id]/services';
import { notFound } from 'next/navigation';
import ChatMessageList from '@/components/chat-message-list';
import { getUserProfile } from '@/libs/session';
import { GoBackBtn } from '@/app/chats/[id]/components';

const ChatRoom = async ({ params }: { params: { id: string } }) => {
  const room = await enterRoom(params.id);
  const initialMessages = await getMessages(params.id);
  const user = await getUserProfile();

  if (!room) return notFound();
  if (!user) return notFound();

  return (
    <div className="relative">
      <ChatMessageList
        chatRoomId={params.id}
        initialMessages={initialMessages}
        userId={user.id}
        username={user.username}
        avatar={user.avatar}
      />
      <GoBackBtn />
    </div>
  );
};

export default ChatRoom;
