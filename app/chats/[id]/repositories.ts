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
