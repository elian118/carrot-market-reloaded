import { Prisma } from '@prisma/client';
import { getComments, getPost } from '@/app/post/[id]/repositories';

export type InitialPost = Prisma.PromiseReturnType<typeof getPost>;

export type InitialComments = Prisma.PromiseReturnType<typeof getComments>;

export type CommentRefIds = {
  postId: number;
  userId: number;
};

export type FormDataType = {
  payload: FormDataEntryValue | null;
};
