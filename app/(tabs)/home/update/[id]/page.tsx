import { unstable_cache as nextCache } from 'next/dist/server/web/spec-extension/unstable-cache';
import ProductForm from '@/components/product-form';
import { notFound } from 'next/navigation';
import { getIsOwner } from '@/app/products/[id]/services';
import { getProduct } from '@/common/repositories/getProduct';

const getCachedProduct = nextCache(getProduct, ['products-detail'], {
  tags: ['detail', 'info'],
});

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const product = params.id ? await getCachedProduct(Number(params.id)) : null;
  return {
    title: product?.title,
  };
};

const Update = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await getCachedProduct(id);
  if (!product) return notFound();
  const isOwner = await getIsOwner(product.user_id);

  return <div>{isOwner && <ProductForm product={product} />}</div>;
};

export default Update;
