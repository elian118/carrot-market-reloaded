'use server';

import db from '@/libs/db';
import { CONTENT_PER_PAGE } from '@/libs/constants';
import { setQueryLog } from '@/libs/utils';

setQueryLog('상품목록 조회');

export const getInitialProducts = async () => {
  return db.product.findMany({
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
};

export const getMoreProducts = async (page: number) => {
  return db.product.findMany({
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
};
