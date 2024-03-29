import React from 'react';
import { ProductProps } from '@/app/(tabs)/home/@modal/(...)products/[id]/types';

export const TitleBox = ({ product }: ProductProps) => {
  return (
    product && (
      <div className="bg-white bg-opacity-75 w-full text-gray-900 text-2xl rounded-t-lg p-4 font-bold">
        {product.title}
      </div>
    )
  );
};
