import api from './api';

const cartService = {
  getCart: async () => {
    const res = await api.get('/cart');
    return res.data;
  },
  addToCart: async (productId, qty = 1) => {
    const res = await api.post('/cart', { productId, qty });
    return res.data;
  },
  updateItem: async (productId, qty) => {
    const res = await api.put(`/cart/${productId}`, { qty });
    return res.data;
  },
  removeItem: async (productId) => {
    const res = await api.delete(`/cart/${productId}`);
    return res.data;
  },
  clearCart: async () => {
    const res = await api.delete('/cart');
    return res.data;
  },
};

export default cartService;
