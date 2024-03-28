'use client';

import { MB } from '@/libs/constants';

export const isOversizeImage = (file: File): boolean => {
  if (file.size > 2 * MB) {
    alert('파일 크기가 2MB를 초과했습니다.');
    return true;
  }
  return false;
};

export const fileUploadToCF = async (file: FormDataEntryValue, uploadUrl: string) => {
  const cloudflareForm = new FormData();
  cloudflareForm.append('file', file);

  return await fetch(uploadUrl, {
    method: 'POST',
    body: cloudflareForm,
  });
};
