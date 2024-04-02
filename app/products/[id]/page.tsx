import { notFound } from 'next/navigation';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/solid';
import { formatToWon, parsePhotoUrl } from '@/libs/utils';
import Button from '@/components/button';
import { getIsOwner, removeProduct } from '@/app/products/[id]/services';
import { unstable_cache as nextCache } from 'next/cache';
import { getProduct, getProducts } from '@/common/repositories';

const getCachedProduct = nextCache(getProduct, ['products-detail'], {
  tags: ['detail', 'info'],
});

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const product = params.id ? await getCachedProduct(Number(params.id)) : null;
  return {
    title: product?.title,
  };
};

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await getCachedProduct(id);
  if (!product) return notFound();
  const isOwner = await getIsOwner(product.user_id);

  return (
    <div>
      <div className="relative aspect-square">
        <Image fill src={parsePhotoUrl(product.photo)} alt={product.title} />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full relative overflow-hidden">
          {!!product.user.avatar ? (
            <Image
              fill
              className="object-cover"
              src={product.user.avatar}
              alt={product.user.username}
            />
          ) : (
            <UserIcon className="size-10" />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full left-0 bottom-0 bg-neutral-800">
        <div className="p-5 mx-auto max-w-screen-sm flex flex-wrap gap-3 justify-between items-center">
          <span className="font-semibold text-xl text-white">
            {formatToWon(product.price)}
          </span>
          <div>
            <form action={removeProduct} method="POST">
              <input type="hidden" name="productId" value={id} />
              {isOwner && (
                <Button type="submit" method="delete">
                  상품 삭제
                </Button>
              )}
            </form>
          </div>
          <div className="flex gap-2">
            <Button href="/home">목록으로</Button>
            <Button href={`/chat/${id}`}>채팅하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

export const generateStaticParams = async () => {
  const products = await getProducts();
  return products.map((product) => ({ id: String(product.id) }));
};
