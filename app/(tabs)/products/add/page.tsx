'use client';

import { ArrowPathIcon, PhotoIcon } from '@heroicons/react/24/solid';
import Button from '@/components/button';
import { PLZ_ADD_PHOTO } from '@/libs/constants';
import Input from '@/components/input';
import { useAddProduct } from '@/app/(tabs)/products/add/hooks';

const AddProduct = () => {
  const { preview, onImageChange, reset, onSubmitData, register, onValid, errors } =
    useAddProduct();

  return (
    <div className="p-4 overflow-y-auto mb-24">
      <form
        className="flex flex-col gap-5"
        action={onValid}
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
                {errors.photo?.message}
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
          placeholder="제목"
          errors={[errors.title?.message ?? '']}
          required
          {...register('title')}
        />
        <Input
          type="number"
          placeholder="가격"
          min={100}
          step={100}
          errors={[errors.price?.message ?? '']}
          required
          {...register('price')}
        />
        <Input
          type="text"
          placeholder="자세한 설명"
          errors={[errors.description?.message ?? '']}
          required
          {...register('description')}
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
