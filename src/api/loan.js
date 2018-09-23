import qs from 'qs'
import request from '@/utils/request'

// 贷款管理api

export function getMortgageList () {
  return request({
    url: '/task/m/view',
    method: 'get'
  })
}
