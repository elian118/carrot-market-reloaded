import Link from 'next/link';
import Image from 'next/image';
import { formatToTimeAgo, formatToWon } from '@/libs/utils';

type ProductListProps = {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
};

const ProductList = ({ title, price, created_at, photo, id }: ProductListProps) => {
  return (
    <Link
      href={`/products/${id}`}
      className="flex gap-5 active:scale-95 hover:scale-105 hover:bg-orange-100 hover:dark:bg-gray-600 hover:p-2 rounded-lg"
    >
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover"
          src={
            photo.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_DELIVERY_URL!)
              ? `${photo}/avatar`
              : photo
          }
          alt={title}
          // loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1 *:text-gray-800 *:dark:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)}</span>
      </div>
    </Link>
  );
};

export default ProductList;
