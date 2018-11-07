import request from '@/utils/request'

export function getTodoList (employeeId) {
  return request({
    url: `/mortgage/employee/${employeeId}`,
    method: 'get'
  })
}

export function getNotice () {
  return request({
    url: '/notice/getNotice',
    method: 'get'
  })
}

export function getNoticeList () {
  return request({
    url: '/notice/getNoticeList',
    method: 'get'
  })
}

export function getQuickEntrance () {
  return request({
    url: '/quickEntrance/getQuickEntrance',
    method: 'get'
  })
}
