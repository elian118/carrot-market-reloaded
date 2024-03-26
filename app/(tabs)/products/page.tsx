import { getInitialProducts } from '@/app/(tabs)/products/features';
import ProductListWrapper from '@/components/product-list-wrapper';
import { InitialProducts } from '@/app/(tabs)/products/types';

const Products = async () => {
  const initialProducts: InitialProducts = await getInitialProducts();

  return (
    <div className="p-5 flex flex-col gap-5">
      <ProductListWrapper initialProducts={initialProducts}></ProductListWrapper>
    </div>
  );
};

export default Products;
