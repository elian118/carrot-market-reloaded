import { getProducts } from '@/app/(tabs)/products/features';
import ProductList from '@/components/product-list';
import NoProduct from '@/components/no-product';

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.length > 0 ? (
        products.map((product) => <ProductList key={product.id} {...product} />)
      ) : (
        <NoProduct />
      )}
    </div>
  );
};

export default Products;
