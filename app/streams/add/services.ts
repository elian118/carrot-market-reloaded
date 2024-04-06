'use server';

import { z } from 'zod';
import { INVALID } from '@/libs/constants';
import { createLiveStream, startLiveStream } from '@/app/streams/add/repositories';
import { getUserProfile } from '@/libs/session';
import { redirect } from 'next/navigation';
import { CFRes } from '@/libs/types';

const title = z.string().min(10, INVALID.TOO_SHORT).max(100, INVALID.TOO_LONG);

export const startStream = async (_: any, formData: FormData) => {
  const results = title.safeParse(formData.get('title'));
  const user = await getUserProfile();

  if (!results.success) return results.error.flatten();
  const streamData: CFRes = await startLiveStream(results.data);

  if (streamData.success && streamData.result) {
    const streamId = await createLiveStream(results.data, streamData.result, user.id);
    redirect(`/streams/${streamId}`);
  } else {
    alert(streamData.messages[0].message);
  }
};
