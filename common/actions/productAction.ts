'use server';

import { getSession } from '@/libs/session';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { productScheme } from '@/common/schemas';
import { createProduct, updateProduct } from '@/common/repositories';
import { FormDataType } from '@/common/types';

const addProduct = async (data: any) => {
  const session = await getSession();
  if (session.id) {
    const product = await createProduct(data, session.id);
    redirect(`/products/${product.id}`);
  }
};

const editProduct = async (data: any, id: number) => {
  const session = await getSession();
  if (session.id) {
    const product = await updateProduct(data, id);
    revalidatePath(`/home/update/${product.id}`);
    redirect(`/home/update/${product.id}`);
  }
};

export const setProductInfo = async (formData: FormData, id?: number) => {
  const data: FormDataType = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };

  const result = productScheme.safeParse(data);

  if (!result.success) return result.error.flatten();
  else id ? await editProduct(result.data, id) : await addProduct(result.data);
};
