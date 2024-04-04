import { Prisma } from '@prisma/client';
import { getMessage } from '@/app/chats/[id]/repositories';

export type InitialMessages = Prisma.PromiseReturnType<typeof getMessage>;

export type Message = NonNullable<InitialMessages>[0];
