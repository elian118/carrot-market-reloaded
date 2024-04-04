import { Prisma } from '@prisma/client';
import { getChatRoomList } from '@/app/(tabs)/chats/repositories';
import { SessionUser } from '@/libs/types';

export type InitialChatRooms = Prisma.PromiseReturnType<typeof getChatRoomList>;

export type ChatRoom = NonNullable<Prisma.PromiseReturnType<typeof getChatRoomList>>[0];

export type ChatRoomListProps = {
  chatRoom?: ChatRoom;
  user: SessionUser;
};
