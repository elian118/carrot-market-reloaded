'use server';

import db from '@/libs/db';
import { setQueryLog } from '@/libs/utils';

export const getStream = async (id: number) => {
  const stream = await db.liveStream.findUnique({
    where: { id },
    select: {
      title: true,
      stream_key: true,
      stream_id: true,
      user_id: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  setQueryLog('스트림 가져오기', 'getStream', stream);
  return stream;
};
