import db from '@/libs/db';
import { getSession } from '@/libs/session';
import { redirect } from 'next/navigation';

// 현재 접속자가 제품 소유자인지 여부 확인
export const getIsOwner = async (userId: number) => {
  const { id } = await getSession();
  return id ? id === userId : false;
};

// 상품 조회
export const getProduct = async (id: number) => {
  // await new Promise((res) => setTimeout(res, 5000));
  return db.product.findUnique({
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
};

// 상품 삭제
export const removeProduct = async (id: number) => {
  'use server';
  await db.product.delete({
    where: { id: id },
  });
  redirect('/products');
};
