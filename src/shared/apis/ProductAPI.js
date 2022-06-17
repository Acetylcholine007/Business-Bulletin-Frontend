import requestAxios from "../../utils/requestAxios";

const getProducts = async (query, page) => {
  return await requestAxios(`/products?query=${query}&page=${page}`);
};

const getProduct = async (productId) => {
  return await requestAxios(`/products/${productId}`);
};

const createProduct = async (data) => {
  return await requestAxios(`/products`, data, "POST", "application/json");
};

const editProduct = async (data, productId) => {
  return await requestAxios(
    `/products/${productId}`,
    data,
    "PATCH",
    "application/json"
  );
};

const deleteProduct = async (productId) => {
  return await requestAxios(`/products/${productId}`, {}, "DELETE");
};

const ProductAPI = {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};

export default ProductAPI;
