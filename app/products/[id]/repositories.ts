'use server';

import db from '@/libs/db';
import { redirect } from 'next/navigation';
import { setQueryLog } from '@/libs/utils';

// 상품 조회
export const getProduct = async (id: number) => {
  // await new Promise((res) => setTimeout(res, 5000));
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
  setQueryLog('상품 상세조회', getProduct.name, result);
  return result;
};

// 상품 삭제
export const removeProduct = async (id: number) => {
  const result = await db.product.delete({
    where: { id: id },
    select: { id: true },
  });
  setQueryLog('상품 삭제', removeProduct.name, result);
  redirect('/products');
};
