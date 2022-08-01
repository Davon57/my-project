import request from './request'

// 获取评论列表
export async function getEvaluations (page, limit, keywords) {
  const resp = await request().get('/api/evaluation/', {
    params: {
      page,
      limit,
      keywords
    }
  })
  return resp.data
}
// 删除评论
export async function deleteEvaluation (id) {
  const resp = await request().delete(`/api/evaluation/${id}`)
  return resp.data
}
// 新增评论
export async function addEvaluation (data) {
  const resp = await request().post('/api/evaluation/', data)
  return resp.data
}
