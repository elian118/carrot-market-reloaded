'use server';

import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const getPosts = async () => {
  // await new Promise((res) => setTimeout(res, 3000));
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  setQueryLog('동네생활 포스트 목록 조회', 'getPosts', posts);
  return posts;
};
