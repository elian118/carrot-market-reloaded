'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatRoom, ChatRoomListProps, InitialChatRooms } from '@/app/(tabs)/chats/types';
import ChatRoomList from '@/app/(tabs)/chats/components/chat-room-list';
import { getMoreChatRooms } from '@/app/(tabs)/chats/repositories';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import NoChat from '@/app/(tabs)/chats/components/no-chat';

type ChatRoomsWrapperProps = {
  initialChatRooms: InitialChatRooms;
  totalChatRoomCounts: number;
} & ChatRoomListProps;

const ChatRoomsWrapper = ({
  initialChatRooms,
  totalChatRoomCounts,
  user,
}: ChatRoomsWrapperProps) => {
  const [chatRooms, setChatRooms] = useState<InitialChatRooms>(initialChatRooms);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(totalChatRoomCounts);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const trigger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];

        const fetchData = (newChatRooms: InitialChatRooms) => {
          setChatRooms((prev: any) => [...prev, ...newChatRooms]);
          setPage((prev) => prev + 1);
        };

        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newChatRooms: ChatRoom[] = await getMoreChatRooms(page, user.id);
          newChatRooms && newChatRooms.length > 0
            ? fetchData(newChatRooms)
            : setIsLastPage(true);
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
        rootMargin: '0px 0px -100px 0px',
      },
    );
    trigger.current && observer.observe(trigger.current);

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div>
      {chatRooms.length > 0 ? (
        chatRooms.map((chatRoom) => (
          <ChatRoomList key={chatRoom.id} chatRoom={chatRoom} user={user} />
        ))
      ) : (
        <NoChat />
      )}
      {isLastPage ? (
        <div className="w-full flex justify-center items-center h-28">
          <span className="mx-auto py-4 text-lg">
            참여중인 모든 대화방을 불러왔습니다.
          </span>
        </div>
      ) : (
        <div
          ref={trigger}
          style={{
            marginTop: `${page * 3}vh`,
            visibility: isLoading ? 'inherit' : 'hidden',
          }}
          className="mb-14 text-sm font-semibold w-fit mx-auto"
        >
          <ArrowPathIcon className="size-14 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ChatRoomsWrapper;
