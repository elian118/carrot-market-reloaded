import { Prisma } from '@prisma/client';
import { getInitialProducts } from '@/app/(tabs)/home/repositories';

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;
