import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

setQueryLog('상품 등록');

export const createProduct = async (data: any, sessionId: number) => {
  return db.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      photo: data.photo,
      user: {
        connect: { id: sessionId },
      },
    },
    select: { id: true },
  });
};
