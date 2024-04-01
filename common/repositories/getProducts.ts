import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const getProducts = async () => {
  const result = await db.product.findMany({
    select: { id: true },
  });
  setQueryLog('상품목록(아이디) 조회', getProducts.name, result);
  return result;
};
