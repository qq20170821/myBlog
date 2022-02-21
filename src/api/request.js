import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: '/',
  // 超时时间
  timeout: 300000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 携带自定义token
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  config.headers['Authorzation'] = userInfo.token || ''
  return config
}, (error) => {
  // 对请求错误做些什么
  Message.error('服务器异常，请联系管理员!')
  return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 对响应数据做点什么
  return Promise.resolve(response);
}, error => {
  // 对响应错误做点什么
  Message.error('服务器异常，请联系管理员!')
  return Promise.reject(error);
})


