import API from '../utils/axiosConfig';

export const getAllProducts = async (limit = 5) => {
  const res = await API.get(`/product/v1/All?limit=${limit}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await API.get(`/product/v1/get/${id}`);
  return res.data;
};

export const searchProducts = async (description) => {
  const res = await API.get(`/product/v1/serch?description=${description}`);
  return res.data;
};

export const createProduct = async (productData, image) => {
  const formData = new FormData();

  const productPayload = {
    ...productData,
    category: { id: parseInt(productData.category) }
  };

  formData.append('product', JSON.stringify(productPayload));
  if (image) {
    formData.append('image', image);
  }

  const res = await API.post(`/product/v1/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await API.put(`/product/v1/update/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`/product/v1/delete/${id}`);
  return res.data;
};

export const getProductsSortedByPrice = async (order = 'asc') => {
  const res = await API.get(`/product/v1/orderPrice?order=${order}`);
  return res.data;
};

export const getProductsSortedByName = async (order = 'asc') => {
  const res = await API.get(`/product/v1/orderName?order=${order}`);
  return res.data;
};

export const uploadProductImage = async (productId, imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const res = await API.post(`/product/v1/product-image/upload/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export const getProductImageUrl = (productId) => {
  return `http://localhost:8092/product/v1/product-image/${productId}`;
};
