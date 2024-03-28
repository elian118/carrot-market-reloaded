'use client';

import { MB, PHOTO_URL, PLZ_ADD_PHOTO } from '@/libs/constants';
import { FormEvent, useState } from 'react';
import { getUploadUrl } from '@/app/(tabs)/products/add/services';
import { uploadProduct } from '@/app/(tabs)/products/add/actions';
import axios from 'axios';

export const useAddProduct = () => {
  const [preview, setPreview] = useState<string>('');
  const [uploadUrl, setUploadUrl] = useState<string>('');
  const [photoId, setPhotoId] = useState<string>('');

  const isOversizeImage = (file: File): boolean => {
    if (file.size > 2 * MB) {
      alert('파일 크기가 2MB를 초과했습니다.');
      return true;
    }
    return false;
  };

  const fileUploadToCF = async (file: FormDataEntryValue, uploadUrl: string) => {
    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file);

    try {
      // return await fetch(uploadUrl, {
      //   method: 'POST',
      //   body: cloudflareForm,
      // });
      return await axios.post(uploadUrl, cloudflareForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    if (isOversizeImage(file)) return; // 파일 용량 체크
    const url = URL.createObjectURL(file); // 브라우저 메모리에 임시 저장된 인풋 업로드 파일을 참조하는 가상 URL 생성
    setPreview(url);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result!;
      setUploadUrl(uploadURL);
      setPhotoId(id);
    }
  };

  const interceptAction = async (_: any, formData: FormData) => {
    const photoUrl = `${PHOTO_URL}/${photoId}`;
    const file = formData.get('photo');
    if (!file) return;

    // 클라우드플레어로 이미지 업로드
    const res = await fileUploadToCF(file, uploadUrl);
    if (res?.status !== 200) return;

    // 폼 데이터의 'photo' 값 대체 - zod 유효성 검사 처리를 위한 타입 불일치 해결 [File → string]
    formData.set('photo', photoUrl);

    // 상품 등록 호출
    return uploadProduct(_, formData);
  };

  const reset = () => setPreview('');

  const onSubmitData = (event: FormEvent) => {
    if (!preview) {
      event.preventDefault();
      alert(PLZ_ADD_PHOTO);
      return;
    }
  };

  return {
    preview,
    onImageChange,
    interceptAction,
    reset,
    onSubmitData,
  };
};
