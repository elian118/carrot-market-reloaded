import Link from 'next/link';
import Image from 'next/image';
import { formatToTimeAgo, formatToWon } from '@/libs/utils';

type ProductListProps = {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  description: string;
  id: number;
};

const ProductList = ({
  title,
  price,
  created_at,
  photo,
  id,
  description,
}: ProductListProps) => {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image fill src={photo} alt={title} />
      </div>
      <div className="flex flex-col gap-1 *:text-gray-800 *:dark:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)}</span>
        <span className="text-md">{description}</span>
      </div>
    </Link>
  );
};

export default ProductList;
