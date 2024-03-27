'use server';

import { z } from 'zod';
import * as fs from 'fs/promises';
import { INVALID } from '@/libs/constants';
import { getSession } from '@/libs/session';
import { redirect } from 'next/navigation';
import { createProduct } from '@/app/(tabs)/products/add/repositories';

const addProduct = async (data: any) => {
  const session = await getSession();
  if (session.id) {
    const product = await createProduct(data, session.id);
    redirect(`/products/${product.id}`);
  }
};

export const uploadProduct = async (_: any, formData: FormData) => {
  const productScheme = z.object({
    photo: z.string({ required_error: '사진이 필요합니다.' }),
    title: z
      .string({ required_error: '제목이 필요합니다.' })
      .min(10, INVALID.TOO_SHORT)
      .max(50, INVALID.TOO_LONG),
    description: z
      .string({ required_error: '자세한 설명이 필요합니다.' })
      .min(10, INVALID.TOO_SHORT)
      .max(300, INVALID.TOO_LONG),
    price: z.coerce
      .number({ required_error: '가격이 필요합니다.' })
      .min(100, '최소 100원 이상이어야 합니다.'),
  });

  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };
  const result = productScheme.safeParse(data);

  // 유효성 검사에서 오류가 발생해도 파일은 올라간다.
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/images/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/images/${data.photo.name}`;
  }

  if (!result.success) return result.error.flatten();
  else await addProduct(result.data);
};
