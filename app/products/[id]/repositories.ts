'use server';

import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

// 상품 조회
export const getProductTitle = async (id: number) => {
  const result = await db.product.findUnique({
    where: { id },
    select: { title: true },
  });
  setQueryLog('상품명 조회', 'getProductTitle', result);
  return result;
};

export const createChatRoom = async (sellerId: number, userId: number) => {
  const room = await db.chatRoom.create({
    data: {
      users: {
        connect: [{ id: sellerId }, { id: userId }],
      },
    },
    select: { id: true },
  });
  setQueryLog('채팅방 개설', 'createChatRoom', room);
  return room;
};
