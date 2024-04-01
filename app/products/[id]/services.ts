'use server';

import { getSession } from '@/libs/session';
import { delProduct } from '@/common/repositories';
import { redirect } from 'next/navigation';

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

// 현재 접속자가 제품 소유자인지 여부 확인
export const getIsOwner = async (userId: number) => {
  const { id } = await getSession();
  return id ? id === userId : false;
};

export const removeProduct = async (id: number) => {
  const { photo } = await delProduct(id);
  const photoId = photo.split('/').slice(-1)[0];
  await delProductImage(photoId);
  redirect('/home');
};
