import axios from 'axios'
import store from '@/store'
import { getToken, getUserId } from './auth'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  // 192.168.10.225
  // baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://192.168.10.225:3000',
  // baseURL: 'http://192.168.10.211:8080',
  // baseURL: 'http://47.93.43.106:8090',
  // baseURL: 'http://aidr.vip:8080/loan',
  // baseURL: 'http://192.168.3.2:8080',
  // baseURL: 'http://192.168.3.6:8080',
  baseURL: 'http://loan.ngrok.xiaomiqiu.cn',
  // baseURL: 'http://116.62.156.52:8080/loan',
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.userId && getToken()) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token
    config.headers['userId'] = getUserId() // 让每个请求携带自定义userId
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // console.log(response)
    if (!getToken() || !getUserId()) {
      // 未登录
      return response
    } else {
      if (response.data.result) {
        return response.data.data
      } else {
        Message({
          type: 'error',
          message: `${response.data.data}`
        })
        return null
      }
    }
  },
  // {
  //   /**
  //    * code为非20000是抛错 可结合自己业务进行修改
  //    */
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })

  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload()// 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    // console.log(error)// for debug
    if (error.response) {
      Message({
        message: error.response.data.data,
        type: 'error'
      })
    } else {
      Message({
        message: error.message,
        type: 'error'
      })
    }
    // return Promise.reject(error) 不抛出错误
  }
)

export default service
