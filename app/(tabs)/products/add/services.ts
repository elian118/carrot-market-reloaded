'use server';

import * as fs from 'fs/promises';
import { FormDataType, UploadURLRes } from '@/app/(tabs)/products/add/types';

export const fileUploadInLocal = async (data: FormDataType) => {
  // 유효성 검사에서 오류가 발생해도 파일은 올라간다.
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/images/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/images/${data.photo.name}`;
  }
};

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
