import qs from 'qs'
import request from '@/utils/request'

// 账号
// export function getAccountList () {
//   return request({
//     url: '/account/getAccountList',
//     method: 'get'
//   })
// }

// // 公告
// export function getNoticeList () {
//   return request({
//     url: '/notice/getNoticeList',
//     method: 'get'
//   })
// }

export function getEmployee (id) {
  return request({
    url: `/employee/${id}`,
    method: 'get'
  })
}

// 表格
// export function getTableList () {
//   return request({
//     url: '/tableValue/allValue',
//     method: 'get'
//   })
// }

// ************************* 部门管理开始 *******************************

/**
 * 获取部门列表
 */
export function getDepartmentList () {
  return request({
    url: '/department',
    method: 'get'
  })
}

/**
 * 根据id获取部门信息
 * @param {*} departmentId 部门id
 */
export function getDepartmentById (departmentId) {
  return request({
    url: `/department/${departmentId}`,
    method: 'get'
  })
}

/**
 * 根据部门iid获取员工列表
 * @param {*} departmentId 部门id
 */
export function getEmployeeListByDepartmentId (departmentId) {
  return request({
    url: `/department/${departmentId}/employee`,
    method: 'get'
  })
}

// ************************* 部门管理结束 *******************************

// ************************* 账号管理开始 *******************************

/**
 * 获取用户列表
 */
export function getUserList () {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function getUserById (userId) {
  return request({
    url: `/user/${userId}`,
    method: 'get'
  })
}

/**
 * 根据id获取员工接口权限
 * @param {*} employeeId 员工id
 */
export function gePermissionByEmployeeId (employeeId) {
  return request({
    url: `/permission/interface/${employeeId}`,
    method: 'get'
  })
}

// ************************* 账号管理结束 *******************************

// ************************* 表格管理开始 *******************************

export function getTableList () {
  return request({
    url: '/tableValue/allValue',
    method: 'get'
  })
}

/**
 * 设置表格的值
 * @param {*} valueType 值类型
 * @param {*} value 值
 * @param {*} remark 备注
 */
export function setTableValue (valueType, value, remark) {
  return request({
    url: `/tableValue/save/${valueType}/${value}/${remark}`,
    method: 'post'
  })
}

// ************************* 表格管理结束 *******************************

// ************************* 公告管理开始 *******************************

/**
 * 获取公告列表
 */
export function getNoticeList () {
  return request({
    url: '/announcement',
    method: 'get'
  })
}

/**
 * 根据id获取公告
 * @param {*} id 公告id
 */
export function getNoticeById (id) {
  return request({
    url: `/announcement/${id}`,
    method: 'get'
  })
}

/**
 * 保存公告
 * @param {*} title 标题
 * @param {*} content 内容
 */
export function saveNotice (title, content) {
  return request({
    url: '/announcement/save',
    method: 'post',
    data: qs.stringify({
      title, content
    })
  })
}

/**
 * 根据id删除公告
 * @param {*} id 公告id
 */
export function deleteNoticeById (id) {
  return request({
    url: `/announcement/delete/${id}`,
    method: 'get'
  })
}

/**
 * 根据id更新某个公告
 * @param {*} id 公告id
 * @param {*} title 标题
 * @param {*} content 内容
 */
export function updateNoticeById (id, title, content) {
  return request({
    url: `/announcement/${id}`,
    method: 'post',
    data: qs.stringify({
      title, content
    })
  })
}
// ************************* 公告管理结束 *******************************
