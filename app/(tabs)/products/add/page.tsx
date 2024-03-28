'use client';

import { ArrowPathIcon, PhotoIcon } from '@heroicons/react/24/solid';
import Button from '@/components/button';
import { PLZ_ADD_PHOTO } from '@/libs/constants';
import { useFormState } from 'react-dom';
import Input from '@/components/input';
import { useAddProduct } from '@/app/(tabs)/products/add/hooks';

const AddProduct = () => {
  const { preview, onImageChange, interceptAction, reset, onSubmitData } =
    useAddProduct();

  const [state, action] = useFormState(interceptAction, null);

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
