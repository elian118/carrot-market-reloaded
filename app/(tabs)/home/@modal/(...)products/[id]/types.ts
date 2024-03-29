import { Prisma } from '@prisma/client';
import { getProduct } from '@/app/(tabs)/home/@modal/(...)products/[id]/repositories';

export type InitialProduct = Prisma.PromiseReturnType<typeof getProduct>;

export type ProductProps = {
  product: InitialProduct;
};
