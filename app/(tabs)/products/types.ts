import { Prisma } from '@prisma/client';
import { getInitialProducts } from '@/app/(tabs)/products/services';

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;
