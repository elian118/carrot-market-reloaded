import { Prisma } from '@prisma/client';
import { getInitialProducts } from '@/app/(tabs)/products/repositories';

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;
