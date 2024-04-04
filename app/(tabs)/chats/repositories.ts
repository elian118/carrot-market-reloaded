'use server';

import db from '@/libs/db';
import { removeDupElements, setQueryLog } from '@/libs/utils';
import { CONTENT_PER_PAGE } from '@/libs/constants';

export const getUserChatRoomIds = async (userId: number) => {
  return db.message.findMany({
    where: { user_id: userId },
    select: { chat_room_id: true },
  });
};

export const getChatRoomList = async (userId: number) => {
  const subQueryResult = await getUserChatRoomIds(userId);
  const userChatRoomIds = removeDupElements(subQueryResult.map((e) => e.chat_room_id));
  const chatRooms = await db.chatRoom.findMany({
    include: {
      messages: {
        where: {
          chat_room_id: { in: userChatRoomIds },
        },
        include: {
          user: {
            select: { username: true, avatar: true },
          },
        },
      },
    },
    take: CONTENT_PER_PAGE,
  });
  const talkedRooms = chatRooms.filter((e) => e.messages.length > 0);
  setQueryLog('채팅 리스트 불러오기', 'getRoomList', talkedRooms);
  return talkedRooms;
};

export const getMoreChatRooms = async (page: number, userId: number) => {
  const subQueryResult = await getUserChatRoomIds(userId);
  const userChatRoomIds = removeDupElements(subQueryResult.map((e) => e.chat_room_id));
  const chatRooms = await db.chatRoom.findMany({
    include: {
      messages: {
        where: {
          chat_room_id: { in: userChatRoomIds },
        },
        include: {
          user: {
            select: { username: true, avatar: true },
          },
        },
      },
    },
    skip: CONTENT_PER_PAGE * page,
    take: CONTENT_PER_PAGE,
  });
  const talkedRooms = chatRooms.filter((e) => e.messages.length > 0);
  setQueryLog('채팅 리스트 불러오기', 'getRoomList', talkedRooms);
  return talkedRooms;
};
