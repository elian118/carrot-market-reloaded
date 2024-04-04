import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const getRoom = async (id: string) => {
  const room = await db.chatRoom.findUnique({
    where: { id },
    include: {
      users: {
        select: { id: true },
      },
    },
  });

  setQueryLog('채팅방 입장', 'getRoom', room);
  return room;
};

export const getMessage = async (chat_room_id: string) => {
  const messages = await db.message.findMany({
    where: { chat_room_id },
    select: {
      id: true,
      payload: true,
      created_at: true,
      user_id: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  setQueryLog('채팅 메시지 목록 불러오기', 'getMessage', messages);
  return messages;
};

export const createMessage = async (
  payload: string,
  chat_room_id: string,
  user_id: number,
) => {
  const result = await db.message.create({
    data: {
      payload,
      chat_room_id,
      user_id,
    },
    select: { id: true },
  });
  setQueryLog('채팅 메시지 기록', 'createMessage', result);
  return result;
};
