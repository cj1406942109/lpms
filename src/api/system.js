import request from '@/utils/request'

// 账号
// export function getAccountList () {
//   return request({
//     url: '/account/getAccountList',
//     method: 'get'
//   })
// }

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
