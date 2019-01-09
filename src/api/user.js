// import qs from 'qs'
import request from '@/utils/request'

export function loginByUsername (name, password) {
  return request({
    url: '/auth/login',
    method: 'get',
    params: {
      name,
      password
    }
  })
}

// export function logout () {
//   return request({
//     url: '/login/logout',
//     method: 'post'
//   })
// }

// v2
// 用户登录
/**
 * 用户登录
 * @param {*} name 用户名
 * @param {*} password 密码
 */
export function login (name, password) {
  return request({
    url: '/user/login',
    method: 'get',
    params: {
      account: name,
      password
    }
  })
}

/**
 * 用户登出
 */
export function logout () {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
