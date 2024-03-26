'use client';

import ProductList from '@/components/product-list';
import NoProduct from '@/components/no-product';
import { InitialProducts } from '@/app/(tabs)/products/types';
import { useState } from 'react';
import Button from '@/components/button';
import { getMoreProducts } from '@/app/(tabs)/products/features';

type ProductListWrapperProps = {
  initialProducts: InitialProducts;
};

const ProductListWrapper = ({ initialProducts }: ProductListWrapperProps) => {
  const [products, setProducts] = useState<InitialProducts>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const onLoadMoreClick = async () => {
    setIsLoading(true);
    // await new Promise((res) => setTimeout(res, 5000));
    const newProducts: any[] = await getMoreProducts(page);
    setProducts((prev: any) => [...prev, ...newProducts]);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  return (
    <div className="mb-20 p-5 flex flex-col gap-5 overflow-y-auto">
      {products.length > 0 ? (
        products.map((product) => <ProductList key={product.id} {...product} />)
      ) : (
        <NoProduct />
      )}
      <Button text="더 불러오기" isLoading={isLoading} onClick={onLoadMoreClick} />
    </div>
  );
};

export default ProductListWrapper;
