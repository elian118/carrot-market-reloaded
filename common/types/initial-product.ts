import { Prisma } from '@prisma/client';
import { getProduct } from '@/common/repositories/getProduct';

export type InitialProduct = Prisma.PromiseReturnType<typeof getProduct>;
