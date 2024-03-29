import { getProduct } from '@/app/products/[id]/repositories';

export const getProductInfo = async (id: string) => await getProduct(Number(id));
