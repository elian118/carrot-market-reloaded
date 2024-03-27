'use server';

import { z } from 'zod';
import * as fs from 'fs/promises';
import { INVALID } from '@/libs/constants';
import db from '@/libs/db';
import { getSession } from '@/libs/session';
import { redirect } from 'next/navigation';

const addProduct = async (data: any) => {
  const session = await getSession();
  if (session.id) {
    const product = await db.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        photo: data.photo,
        user: {
          connect: { id: session.id },
        },
      },
      select: { id: true },
    });
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

  if (data.photo instanceof File) {
    // fixme: ReferenceError: File is not defined
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/images/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/images/${data.photo.name}`;
  }

  if (!result.success) return result.error.flatten();
  else await addProduct(result.data);
};