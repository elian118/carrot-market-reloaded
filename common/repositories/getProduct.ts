import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const getProduct = async (id: number) => {
  const result = await db.product.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  setQueryLog('상품 상세조회', 'getProduct', result);
  return result;
};
