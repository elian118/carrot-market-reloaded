import { getInitialProducts } from '@/app/(tabs)/products/services';
import ProductListWrapper from '@/components/product-list-wrapper';
import { InitialProducts } from '@/app/(tabs)/products/types';
import { PlusIcon } from '@heroicons/react/24/solid';
import IconButton from '@/components/icon-button';

const Products = async () => {
  const initialProducts: InitialProducts = await getInitialProducts();

  return (
    <div className="p-5 flex flex-col gap-5">
      <ProductListWrapper initialProducts={initialProducts} />
      <div className="fixed bottom-24 right-8">
        <IconButton icon={<PlusIcon className="size-10" />} href="/products/add" />
      </div>
    </div>
  );
};

export default Products;
