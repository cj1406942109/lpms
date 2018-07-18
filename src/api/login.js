import qs from 'qs'
import request from '@/utils/request'

export function loginByUsername (name, password) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.stringify({
      name,
      password
    })
  })
}

export function logout () {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

