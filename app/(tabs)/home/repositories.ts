'use server';

import db from '@/libs/db';
import { CONTENT_PER_PAGE } from '@/libs/constants';
import { setQueryLog } from '@/libs/utils';

export const getInitialProducts = async () => {
  const result = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      description: true,
      id: true,
    },
    take: CONTENT_PER_PAGE,
    orderBy: {
      created_at: 'desc',
    },
  });
  setQueryLog('첫 상품목록 조회', 'getInitialProducts', result);
  return result;
};

export const getMoreProducts = async (page: number) => {
  const result = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      description: true,
      id: true,
    },
    skip: CONTENT_PER_PAGE * page,
    take: CONTENT_PER_PAGE,
    orderBy: {
      created_at: 'desc',
    },
  });
  setQueryLog('상품목록 더 보기', 'getMoreProducts', result);
  return result;
};
