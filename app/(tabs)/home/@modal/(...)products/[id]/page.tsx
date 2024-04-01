import { getProductInfo } from '@/app/(tabs)/home/@modal/(...)products/[id]/services';
import {
  CloseBtn,
  EditBtn,
  ProductImage,
  TitleBox,
  UserInfo,
} from '@/app/(tabs)/home/@modal/(...)products/[id]/components';
import { PhotoIcon } from '@heroicons/react/24/solid';

const Modal = async ({ params }: { params: { id: string } }) => {
  const product = await getProductInfo(params.id);

  return (
    <div className="absolute w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-60 left-0 top-0">
      <div className="absolute w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-60 left-0 top-0">
        <div className="max-w-screen-sm h-1/2 flex justify-center w-full items-center">
          <div className="w-28 h-8 flex gap-3 absolute right-5 top-5 *:text-neutral-200">
            <EditBtn id={params.id} />
            <CloseBtn />
          </div>
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
    </div>
  );
};

export default Modal;
