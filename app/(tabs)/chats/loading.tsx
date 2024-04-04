import React from 'react';
import ChatRoomsSkeletonBoxes from '@/app/(tabs)/chats/components/chat-rooms-skeleton-boxes';

const Loading = () => {
  return (
    <div className="overflow-hidden p-4">
      {[...Array(10)].map((_, idx) => (
        <ChatRoomsSkeletonBoxes key={idx} />
      ))}
    </div>
  );
};

export default Loading;
