import request from './request'

export async function sendEmail (email) {
  const resp = await request().post('/api/email', email)
  return resp.data
}
