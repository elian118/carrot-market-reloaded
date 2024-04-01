'use server';

import { getSession } from '@/libs/session';
import { redirect } from 'next/navigation';
import { productScheme } from '@/common/schemas/productScheme';
import { createProduct } from '@/common/repositories';
import { FormDataType } from '@/common/types';

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
