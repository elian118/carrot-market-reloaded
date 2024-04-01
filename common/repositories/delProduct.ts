import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const delProduct = async (id: number) => {
  const result = await db.product.delete({
    where: { id: id },
    select: { id: true, photo: true },
  });
  setQueryLog('상품 삭제', delProduct.name, result);
  return result;
};
