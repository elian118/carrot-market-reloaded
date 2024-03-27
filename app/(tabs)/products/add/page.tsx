'use client';

import { ArrowPathIcon, PhotoIcon } from '@heroicons/react/24/solid';
import Button from '@/components/button';
import { FormEvent, useState } from 'react';
import { uploadProduct } from '@/app/(tabs)/products/add/actions';
import { MB, PLZ_ADD_PHOTO } from '@/libs/constants';

const AddProduct = () => {
  const [preview, setPreview] = useState<string>('');

  const isOversizeImage = (file: File): boolean => {
    if (file.size > 2 * MB) {
      alert('파일 크기가 2MB를 초과했습니다.');
      return true;
    }
    return false;
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    if (isOversizeImage(file)) return; // 파일 용량 체크
    const url = URL.createObjectURL(file); // 브라우저 메모리에 임시 저장된 인풋 업로드 파일을 참조하는 가상 URL 생성
    setPreview(url);
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
    <div className="p-4">
      <form
        className="flex flex-col gap-5"
        action={uploadProduct}
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
        <input type="text" name="title" placeholder="제목" required />
        <input
          type="number"
          name="price"
          placeholder="가격"
          min={100}
          step={100}
          required
        />
        <input type="text" name="description" placeholder="자세한 설명" />
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
