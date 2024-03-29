'use client';

import ProductList from '@/components/product-list';
import NoProduct from '@/components/no-product';
import { InitialProducts } from '@/app/(tabs)/home/types';
import { useEffect, useRef, useState } from 'react';
import { getMoreProducts } from '@/app/(tabs)/home/repositories';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

type ProductListWrapperProps = {
  initialProducts: InitialProducts;
};

const ProductListWrapper = ({ initialProducts }: ProductListWrapperProps) => {
  const [products, setProducts] = useState<InitialProducts>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const trigger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];

        const fetchData = (newProducts: InitialProducts) => {
          setProducts((prev: any) => [...prev, ...newProducts]);
          setPage((prev) => prev + 1);
        };

        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts: any[] = await getMoreProducts(page);
          newProducts && newProducts.length > 0
            ? fetchData(newProducts)
            : setIsLastPage(true);
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
        rootMargin: '0px 0px -100px 0px',
      },
    );
    trigger.current && observer.observe(trigger.current);

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="mb-20 p-5 flex flex-col gap-5 overflow-y-auto">
      {products.length > 0 ? (
        products.map((product) => <ProductList key={product.id} {...product} />)
      ) : (
        <NoProduct />
      )}
      {isLastPage ? (
        <span className="mx-auto py-4 text-lg">모든 상품을 불러왔습니다.</span>
      ) : (
        <div
          ref={trigger}
          style={{
            marginTop: `${page * 3}vh`,
            visibility: isLoading ? 'inherit' : 'hidden',
          }}
          className="mb-14 text-sm font-semibold w-fit mx-auto"
        >
          <ArrowPathIcon className="size-14 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ProductListWrapper;
