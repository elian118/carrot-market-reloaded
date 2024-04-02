import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const createProduct = async (data: any, sessionId: number) => {
  const result = await db.product.create({
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
  setQueryLog('상품 등록', 'createProduct', result);
  return result;
};
