import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const updateProduct = async (data: any, id: number) => {
  const result = await db.product.update({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      photo: data.photo,
    },
    where: { id },
    select: { id: true },
  });
  setQueryLog('상품정보 수정', 'updateProduct', result);
  return result;
};
