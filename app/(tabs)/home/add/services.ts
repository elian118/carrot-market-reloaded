'use server';

import * as fs from 'fs/promises';
import { FormDataType } from '@/common/types';

export const fileUploadInLocal = async (data: FormDataType) => {
  // 유효성 검사에서 오류가 발생해도 파일은 올라간다.
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/images/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/images/${data.photo.name}`;
  }
};
