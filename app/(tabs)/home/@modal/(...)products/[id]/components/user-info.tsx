import React from 'react';
import { ProductProps } from '@/app/(tabs)/home/@modal/(...)products/[id]/types';
import Image from 'next/image';
import { parsePhotoUrl } from '@/libs/utils';

export const UserInfo = ({ product }: ProductProps) => {
  return (
    product && (
      <div className="flex gap-2 p-4 w-full rounded-b-md items-center bg-white bg-opacity-75">
        <div className="size-12 rounded-full">
          <Image
            className="object-fill rounded-full"
            width={200}
            height={200}
            src={parsePhotoUrl(product.user.avatar, 'avatar')}
            alt={product.user.username}
          />
        </div>
        <div>
          <div className="text-lg text-gray-900">{product.user.username}</div>
          <div className="text-gray-900">{product.description}</div>
        </div>
      </div>
    )
  );
};
