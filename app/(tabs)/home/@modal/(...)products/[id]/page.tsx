import { PhotoIcon } from '@heroicons/react/24/solid';
import { getProductInfo } from '@/app/(tabs)/home/@modal/(...)products/[id]/services';
import {
  CloseBtn,
  ProductImage,
  TitleBox,
  UserInfo,
} from '@/app/(tabs)/home/@modal/(...)products/[id]/components';

const Modal = async ({ params }: { params: { id: string } }) => {
  const product = await getProductInfo(params.id);

  return (
    <div className="absolute w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-60 left-0 top-0">
      <div className="max-w-screen-sm h-1/2 flex justify-center w-full items-center">
        <CloseBtn />
        {product ? (
          <div className="rounded-md flex justify-center items-center flex-wrap relative gap-2">
            <TitleBox product={product} />
            <ProductImage product={product} />
            <UserInfo product={product} />
          </div>
        ) : (
          <div className="aspect-square bg-neutral-700 text-neutral-200 rounded-md flex justify-center items-center w-full overflow-hidden">
            <PhotoIcon className="h-28" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
