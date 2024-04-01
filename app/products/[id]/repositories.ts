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

export const getProductTitle = async (id: number) => {
  const result = await db.product.findUnique({
    where: { id },
    select: { title: true },
  });
  setQueryLog('상품명 조회', getProductTitle.name, result);
  return result;
};

export const getProducts = async () => {
  const result = await db.product.findMany({
    select: { id: true },
  });
  setQueryLog('상품목록(아이디) 조회', getProducts.name, result);
  return result;
};

const delProductImage = async (imageId: string) => {
  await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1/${imageId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_KEY}`,
      },
    },
  );
};

// 상품 삭제
export const removeProduct = async (id: number) => {
  const result = await db.product.delete({
    where: { id: id },
    select: { id: true, photo: true },
  });
  const photoId = result.photo.split('/').slice(-1)[0];
  await delProductImage(photoId);
  setQueryLog('상품 삭제', removeProduct.name, result);
  redirect('/home');
};
