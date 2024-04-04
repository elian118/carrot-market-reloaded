import { Prisma } from '@prisma/client';
import { getMessage } from '@/app/chats/[id]/repositories';

export type InitialMessages = Prisma.PromiseReturnType<typeof getMessage>;

export type Message = {
  id: number;
  payload: string;
  created_at: Date;
  user_id: number;
  user: {
    username: string;
    avatar: string | null;
  };
};
