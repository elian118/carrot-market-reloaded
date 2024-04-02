'use server';

import { createLike, delLike, getLike } from '@/app/post/[id]/repositories';
import { revalidatePath } from 'next/cache';
import { getSessionId } from '@/libs/session';

export const getIsLiked = async (postId: number) => {
  const sessionId = await getSessionId();
  const like = await getLike(postId, sessionId!);
  return Boolean(like);
};

export const likePost = async (formData: FormData) => {
  try {
    const id = formData.get('postId');
    const sessionId = await getSessionId();
    await createLike(Number(id), sessionId!);
    revalidatePath(`/post/${id}`);
  } catch (e) {}
};

export const dislikePost = async (formData: FormData) => {
  try {
    const id = formData.get('postId');
    const sessionId = await getSessionId();
    await delLike(Number(id), sessionId!);
    revalidatePath(`/post/${id}`);
  } catch (e) {}
};
