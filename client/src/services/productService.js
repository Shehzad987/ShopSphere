import api from './api';

const productService = {
  getProducts: async (params = {}) => {
    const res = await api.get('/products', { params });
    return res.data;
  },
  getFeatured: async () => {
    const res = await api.get('/products/featured');
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
  getRelated: async (id) => {
    const res = await api.get(`/products/${id}/related`);
    return res.data;
  },
  getCategories: async () => {
    const res = await api.get('/products/categories');
    return res.data;
  },
  addReview: async (id, data) => {
    const res = await api.post(`/products/${id}/reviews`, data);
    return res.data;
  },
};

export default productService;
