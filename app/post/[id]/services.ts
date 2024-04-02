'use server';

import { createLike, delLike, getLike, getLikeCount } from '@/app/post/[id]/repositories';
import { revalidateTag } from 'next/cache';
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
    revalidateTag(`like-status-${id}`);
  } catch (e) {}
};

export const dislikePost = async (formData: FormData) => {
  try {
    const id = formData.get('postId');
    const sessionId = await getSessionId();
    await delLike(Number(id), sessionId!);
    revalidateTag(`like-status-${id}`);
  } catch (e) {}
};

export const getLikeStatus = async (id: number) => {
  const isLiked = await getIsLiked(Number(id));
  const likeCount = await getLikeCount(Number(id));

  return {
    likeCount,
    isLiked: isLiked,
  };
};
