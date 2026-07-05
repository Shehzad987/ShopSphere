import api from './api';

const orderService = {
  createOrder: async (data) => {
    const res = await api.post('/orders', data);
    return res.data;
  },
  getMyOrders: async () => {
    const res = await api.get('/orders/myorders');
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },
  payOrder: async (id) => {
    const res = await api.put(`/orders/${id}/pay`);
    return res.data;
  },
};

export default orderService;
