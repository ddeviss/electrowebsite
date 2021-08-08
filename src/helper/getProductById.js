import products from "./TestData";
export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};
