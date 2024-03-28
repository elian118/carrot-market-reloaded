'use client';

import { ArrowPathIcon, PhotoIcon } from '@heroicons/react/24/solid';
import Button from '@/components/button';
import { FormEvent, useState } from 'react';
import { uploadProduct } from '@/app/(tabs)/products/add/actions';
import { PHOTO_URL, PLZ_ADD_PHOTO } from '@/libs/constants';
import { useFormState } from 'react-dom';
import Input from '@/components/input';
import { getUploadUrl } from '@/app/(tabs)/products/add/services';
import { fileUploadToCF, isOversizeImage } from '@/app/(tabs)/products/add/utils';

const AddProduct = () => {
  const [preview, setPreview] = useState<string>('');
  const [uploadUrl, setUploadUrl] = useState<string>('');
  const [photoId, setPhotoId] = useState<string>('');

  const interceptAction = async (_: any, formData: FormData) => {
    const photoUrl = `${PHOTO_URL}/${photoId}`;
    const file = formData.get('photo');
    if (!file) return;

    // 클라우드플레어로 이미지 업로드
    const res = await fileUploadToCF(file, uploadUrl);
    if (res.status !== 200) return;

    // 폼 데이터의 'photo' 값 대체 - zod 유효성 검사 처리를 위한 타입 불일치 해결 [File → string]
    formData.set('photo', photoUrl);

    // 상품 등록 호출
    return uploadProduct(_, formData);
  };

  const [state, action] = useFormState(interceptAction, null);

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

  const reset = () => setPreview('');

  const onSubmitData = (event: FormEvent) => {
    if (!preview) {
      event.preventDefault();
      alert(PLZ_ADD_PHOTO);
      return;
    }
  };

  return (
    <div className="p-4 overflow-y-auto mb-24">
      <form
        className="flex flex-col gap-5"
        action={action}
        onSubmit={(e) => onSubmitData(e)}
      >
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 group border-neutral-300 rounded-md border-dashed hover:border-orange-400 bg-center bg-cover hover:cursor-pointer"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview && (
            <>
              <PhotoIcon className="w-20 group-hover:text-orange-400" />
              <div className="text-neutral-400 group:hover:text-orange-400 group-hover:text-orange-400">
                {PLZ_ADD_PHOTO}
                {state?.fieldErrors.photo}
              </div>
            </>
          )}
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          className="hidden"
          accept="image/*"
          onChange={onImageChange}
        />
        <Input
          type="text"
          name="title"
          placeholder="제목"
          errors={state?.fieldErrors.title}
          required
        />
        <Input
          type="number"
          name="price"
          placeholder="가격"
          min={100}
          step={100}
          errors={state?.fieldErrors.price}
          required
        />
        <Input
          type="text"
          name="description"
          placeholder="자세한 설명"
          errors={state?.fieldErrors.description}
          required
        />
        <div className="flex gap-2 mx-auto">
          <Button type="submit">작성완료</Button>
          <Button
            type="reset"
            onClick={reset}
            icon={<ArrowPathIcon className="size-4 text-white" />}
          >
            초기화
          </Button>
          <Button type="button" href="/products">
            돌아가기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
