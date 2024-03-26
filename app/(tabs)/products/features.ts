'use server';

import db from '@/libs/db';
import { CONTENT_PER_PAGE } from '@/libs/constants';

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
    skip: page,
    take: CONTENT_PER_PAGE,
    orderBy: {
      created_at: 'desc',
    },
  });
};
