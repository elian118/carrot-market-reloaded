'use server';

import { UploadURLRes } from '@/common/types';

export const getUploadUrl = async (): Promise<UploadURLRes> => {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_KEY}`,
      },
    },
  );
  return await res.json();
};
