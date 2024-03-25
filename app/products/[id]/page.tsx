import { getProduct } from '@/app/products/[id]/features';

const ProductDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await getProduct();

  return <div>제품 상세 번호: {id}</div>;
};

export default ProductDetail;
