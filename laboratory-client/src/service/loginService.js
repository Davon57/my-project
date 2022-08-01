import request from './request'

function delay (duratioin) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duratioin)
  })
}

export async function login (loginId, loginPwd) {
  await delay(1000)
  const resp = await request().post('/api/admin/login', { loginId, loginPwd })
  return resp.data
}

export function loginOut () {
  localStorage.removeItem('token')
}

export async function deleteUser (id) {
  const resp = await request().delete(`/api/admin/${id}`)
  return resp.data
}

export async function whoAmI () {
  await delay(2000)
  const resp = await request().get('/api/admin/whoami')
  return resp.data
}
// 获取用户列表
export async function getUsers (page, limit, keywords) {
  const resp = await request().get('/api/admin/', {
    params: {
      page,
      limit,
      keywords
    }
  })
  return resp.data
}
// 更改用户信息
export async function updateUser (id, user) {
  const resp = await request().put(`/api/admin/${id}`, user)
  return resp.data
}
// 添加用户
export async function addUser (user) {
  const resp = await request().post('/api/admin/register', user)
  return resp.data
}
