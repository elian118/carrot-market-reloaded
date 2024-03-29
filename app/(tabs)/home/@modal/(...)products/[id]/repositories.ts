import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const getProduct = async (id: number) => {
  const result = db.product.findUnique({
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
  setQueryLog('상품 상세정보 조회', getProduct.name, result);
  return result;
};
