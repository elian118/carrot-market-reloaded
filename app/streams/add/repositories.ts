'use server';

import db from '@/libs/db';
import { CFStreamResResult } from '@/libs/types';
import { setQueryLog } from '@/libs/utils';

export const createLiveStream = async (
  title: string,
  stream: CFStreamResResult,
  user_id: number,
) => {
  const result = await db.liveStream.create({
    data: {
      title,
      stream_id: stream.uid,
      stream_key: stream.rtmps.streamKey,
      user_id,
    },
    select: { id: true },
  });
  setQueryLog('라이브 스트리밍 생성', 'createLiveStream', result);
  return result;
};

export const startLiveStream = async (title: string) => {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
    {
      method: 'POST',
      headers: {
        // Todo: 나중에 클라우드 플레어 스트림 API 키(토큰) 받으면 교체
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_KEY}`,
      },
      body: JSON.stringify({
        meta: { name: title },
        recording: { mode: 'automatic' },
      }),
    },
  );
  const data = await res.json();
  console.log(data);
  return data;
};
