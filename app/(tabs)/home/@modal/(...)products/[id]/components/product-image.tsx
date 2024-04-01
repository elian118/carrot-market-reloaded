import Image from 'next/image';
import { ProductProps } from '@/app/(tabs)/home/@modal/(...)products/[id]/types';
import { parsePhotoUrl } from '@/libs/utils';

export const ProductImage = ({ product }: ProductProps) => {
  return (
    product && (
      <Image
        className="aspect-square object-cover rounded-md"
        width={700}
        height={700}
        src={parsePhotoUrl(product.photo)}
        alt={product.title}
      />
    )
  );
};
