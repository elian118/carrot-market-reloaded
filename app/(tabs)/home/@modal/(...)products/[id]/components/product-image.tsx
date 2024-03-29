import Image from 'next/image';
import { ProductProps } from '@/app/(tabs)/home/@modal/(...)products/[id]/types';

export const ProductImage = ({ product }: ProductProps) => {
  return (
    product && (
      <Image
        className="aspect-square object-cover rounded-md"
        width={700}
        height={700}
        src={
          product.photo.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_DELIVERY_URL!)
            ? `${product.photo}/public`
            : product.photo
        }
        alt={product.title}
      />
    )
  );
};
