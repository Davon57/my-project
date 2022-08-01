import request from './request';

// 获取订单列表
export async function getOrders(page, limit, keywords) {
  const resp = await request().get('/api/order/', {
    params: {
      page,
      limit,
      keywords,
    },
  });
  return resp.data;
}

// 删除订单
export async function deleteOrder(id) {
  const resp = await request().delete(`/api/order/${id}`);
  return resp.data;
}
// 新增订单
export async function addOrder(data) {
  const resp = await request().post('/api/order/', data);
  return resp.data;
}

// 更改订单
export async function updateOrder(id, data) {
  const resp = await request().put(`/api/order/${id}`, data);
  return resp.data;
}
