export const getProducts = async () => {
  await new Promise((res) => {
    setTimeout(res, 5000);
  });
};
