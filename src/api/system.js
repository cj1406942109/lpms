import request from '@/utils/request'

// 账号
export function getAccountList () {
  return request({
    url: '/account/getAccountList',
    method: 'get'
  })
}

// 公告
export function getNoticeList () {
  return request({
    url: '/notice/getNoticeList',
    method: 'get'
  })
}

export function getEmployee (id) {
  return request({
    url: `/employee/${id}`,
    method: 'get'
  })
}

// 表格
export function getTableList () {
  return request({
    url: '/tableValue/allValue',
    method: 'get'
  })
}
