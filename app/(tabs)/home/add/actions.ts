'use server';

import { getSession } from '@/libs/session';
import { redirect } from 'next/navigation';
import { createProduct } from '@/app/(tabs)/home/add/repositories';
import { FormDataType } from '@/app/(tabs)/home/add/types';
import { productScheme } from '@/app/(tabs)/home/add/schemas';

const addProduct = async (data: any) => {
  const session = await getSession();
  if (session.id) {
    const product = await createProduct(data, session.id);
    redirect(`/products/${product.id}`);
  }
};

export const uploadProduct = async (formData: FormData) => {
  const data: FormDataType = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };
  const result = productScheme.safeParse(data);

  // 로컬 서버로 이미지 파일 업로드
  // await fileUploadInLocal(data);

  if (!result.success) return result.error.flatten();
  else await addProduct(result.data);
};
