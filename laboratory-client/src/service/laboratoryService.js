import request from './request'

// function delay(duratioin) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, duratioin);
//   });
// }

// 获取实验室列表
export async function getLaboratories (page, limit, keywords) {
  const resp = await request().get('/api/laboratory/', {
    params: {
      page,
      limit,
      keywords
    }
  })
  return resp.data
}
// 新增实验室
export async function addLaboratory (laboratory) {
  const resp = await request().post('/api/laboratory/', laboratory)
  return resp.data
}
// 删除实验室
export async function deleteLaboratory (id) {
  const resp = await request().delete(`/api/laboratory/${id}`)
  return resp.data
}
// 更改实验室信息
export async function updateLaboratory (id, laboratory) {
  const resp = await request().put(`/api/laboratory/${id}`, laboratory)
  return resp.data
}
// 获取某个实验室详情
export async function getLaboratoryById (id) {
  const resp = await request().get(`/api/laboratory/${id}`)
  return resp.data
}
