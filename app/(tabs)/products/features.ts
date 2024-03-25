import db from '@/libs/db';

export const getProducts = async () => {
  return db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      description: true,
      id: true,
    },
  });
};
