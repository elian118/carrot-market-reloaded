import { Prisma } from '@prisma/client';
import { getInitialProducts } from '@/app/(tabs)/products/features';

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;