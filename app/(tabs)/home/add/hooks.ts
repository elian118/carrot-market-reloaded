'use client';

import { MB, PHOTO_URL, PLZ_ADD_PHOTO } from '@/libs/constants';
import { FormEvent, useState } from 'react';
import { getUploadUrl } from '@/app/(tabs)/home/add/services';
import { uploadProduct } from '@/app/(tabs)/home/add/actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productScheme, ProductType } from '@/app/(tabs)/home/add/schemas';

export const useAddProduct = () => {
  const [preview, setPreview] = useState<string>('');
  const [uploadUrl, setUploadUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // setError,
  } = useForm<ProductType>({ resolver: zodResolver(productScheme) });

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

    return await fetch(uploadUrl, {
      method: 'POST',
      body: cloudflareForm,
    });
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
    setFile(file);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result!;
      setUploadUrl(uploadURL);
      setValue('photo', `${PHOTO_URL}/${id}`);
    }
  };

  const onSubmit = handleSubmit(async (data: ProductType) => {
    if (!file) return;

    // 클라우드플레어로 이미지 업로드
    const res = await fileUploadToCF(file, uploadUrl);

    if (res.status !== 200) {
      if (res.status === 409) alert('중복된 이미지가 존재합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', String(data.price));
    formData.append('description', data.description);
    formData.append('photo', data.photo);

    // 상품 등록 호출
    const errors = await uploadProduct(formData);
    if (errors) {
      // zod 에서 이미 모든 필드 오류를 다루고 있으므로, 아래 부가 오류 설정과정 불필요
      // 오류 재정의 필요 시 사용
      // setError();
    }
  });

  const reset = () => setPreview('');

  const onSubmitData = (event: FormEvent) => {
    if (!preview) {
      event.preventDefault();
      alert(PLZ_ADD_PHOTO);
      return;
    }
  };

  const onValid = async () => await onSubmit();

  return {
    preview,
    onImageChange,
    reset,
    onSubmitData,
    register,
    onValid,
    errors,
  };
};
