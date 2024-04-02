'use server';

import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const getPost = async (id: number) => {
  // 포스트 상세 조회는 조회수를 올려야 하므로 update 처리
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1, // 조회수 1씩 증가
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    setQueryLog('동네생활 포스트 상세조회', 'getPost', post);
    return post;
  } catch (err) {
    return null;
  }
};

export const createLike = async (id: number, sessionId: number) => {
  const result = await db.like.create({
    data: {
      post_id: id,
      user_id: sessionId!,
    },
  });
  setQueryLog('좋아요', 'likePost', result);
};

export const getLike = async (id: number, sessionId: number) => {
  const like = await db.like.findUnique({
    where: {
      id: {
        post_id: id,
        user_id: sessionId,
      },
    },
  });
  setQueryLog('좋아요 여부 확인', 'getLike', like);
  return like;
};

export const delLike = async (id: number, sessionId: number) => {
  const result = await db.like.delete({
    where: {
      id: {
        post_id: id,
        user_id: sessionId,
      },
    },
  });
  setQueryLog('싫어요', 'dislikePost', result);
};

export const getLikeCount = async (postId: number) => {
  const likeCounts = await db.like.count({
    where: {
      post_id: postId,
    },
  });
  setQueryLog('좋아요 수 조회', 'getLikeCount', likeCounts);
  return likeCounts;
};
