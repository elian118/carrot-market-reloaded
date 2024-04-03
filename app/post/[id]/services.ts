'use server';

import {
  createLike,
  delComment,
  delLike,
  getLike,
  getLikeCount,
} from '@/app/post/[id]/repositories';
import { revalidateTag } from 'next/cache';
import { getSessionId } from '@/libs/session';

export const getIsLiked = async (postId: number) => {
  const sessionId = await getSessionId();
  const like = await getLike(postId, sessionId!);
  return Boolean(like);
};

export const likePost = async (postId: number) => {
  // await new Promise((r) => setTimeout(r, 5000));
  try {
    const sessionId = await getSessionId();
    await createLike(Number(postId), sessionId!);
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
};

export const dislikePost = async (postId: number) => {
  // await new Promise((r) => setTimeout(r, 5000));
  try {
    const sessionId = await getSessionId();
    await delLike(Number(postId), sessionId!);
    revalidateTag(`like-status-${postId}`);
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

export const fetchComment = async (postId: number) => {
  revalidateTag(`post-comments-${postId}`);
};

export const removeComment = async (commentId: number, postId: number) => {
  await delComment(commentId);
  await fetchComment(postId);
};
