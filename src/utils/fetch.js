/**
 * 创建于 2018/2/27
 * 作者: SHERlocked93
 * 功能: axios初步封装
 */

import Axios from 'axios'

const service = Axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
})

/* request 拦截器 */
service.interceptors.request.use(config => {
  return config
}, err => {
  console.error(err, ' error in fetch.js')
  return Promise.reject(err)
})

/* response 拦截器 */
service.interceptors.response.use(resp => {
  return resp.data
}, err => {
  console.error({ title: '通信失败', message: `网络通信异常，请检查! in fetch.js ${err}` })
  return Promise.reject(err)
})

export default service
