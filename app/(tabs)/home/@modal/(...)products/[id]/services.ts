import { getProduct } from '@/common/repositories';

export const getProductInfo = async (id: string) => await getProduct(Number(id));
