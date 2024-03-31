import { getInitialProducts } from '@/app/(tabs)/home/repositories';
import ProductListWrapper from '@/components/product-list-wrapper';
import { InitialProducts } from '@/app/(tabs)/home/types';
import { PlusIcon } from '@heroicons/react/24/solid';
import IconButton from '@/components/icon-button';
// import { revalidatePath, unstable_cache as nextCache } from 'next/cache';

// const getCachedProducts = nextCache(getInitialProducts, ['home-products']);

export const metadata = {
  title: '홈',
};

const Products = async () => {
  const initialProducts: InitialProducts = await getInitialProducts();

  // const revalidate = async () => {
  //   'use server';
  //   revalidatePath('/home');
  // };

  return (
    <div className="p-5 flex flex-col gap-5">
      {/*<form action={revalidate}>*/}
      {/*  <button>Revalidate</button>*/}
      {/*</form>*/}
      <ProductListWrapper initialProducts={initialProducts} />
      <div className="fixed bottom-24 right-8">
        <IconButton icon={<PlusIcon className="size-10" />} href="/products/add" />
      </div>
    </div>
  );
};

export default Products;
