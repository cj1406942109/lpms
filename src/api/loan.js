import qs from 'qs'
import request from '@/utils/request'

// 贷款管理api

/**
 * 查询所有的订单列表
 * @param {*} loanType 贷款类型
 * @param {*} loanNumber 贷款编号
 * @param {*} clientName 客户姓名
 * @param {*} IDCard 客户身份证号
 * @param {*} employeeName 经办人员
 * @param {*} bank 经办银行
 * @param {*} startDate 开始日期
 * @param {*} endDate 结束日期
 * @param {*} page 当前页数
 * @param {*} rows 当前页数显示的记录数
 */
// export function getOrderList (loanType, loanNumber, clientName, IDCard, employeeName, bank, startDate, endDate, page, rows) {
export function getOrderList (options, page, rows) {
  const params = JSON.parse(JSON.stringify(options))
  params.startDate = params.period ? params.period[0] : ''
  params.endDate = params.period ? params.period[0] : ''
  delete params['period']
  params.page = page - 1
  params.rows = rows
  // 如果查询条件为空，则不添加改查询参数
  for (const key in params) {
    if (!params[key]) {
      delete params[key]
    }
  }
  return request({
    url: '/common/list',
    method: 'get',
    params
  })
}

/**
 * 根据贷款编号查询订单
 * @param {*} loanNumber 贷款编号
 */
export function getOrderById (loanNumber) {
  return request({
    url: '/orderManage/queryOrderFlow',
    method: 'get',
    params: {
      loanNumber
    }
  })
}

/**
 * 删除订单
 * @param {*} loanId 贷款编号
 * @param {*} taskId 任务编号
 * @param {*} comment 备注信息
 */
export function deleteOrder (loanId, taskId, comment) {
  return request({
    url: '/orderManage/deleteOrderNotComplete',
    method: 'post',
    data: qs.stringify({
      loanId, taskId, comment
    })
  })
}

/**
 * 分配任务给员工
 * @param {*} rootId 任务id
 * @param {*} employeeId 员工id
 */
export function assinTaskToUser (rootId, employeeId) {
  return request({
    url: `/common/task/${rootId}/assign`,
    method: 'post',
    data: qs.stringify({
      employeeId
    })
  })
}

/**
 * 报表相关接口，获取二手房贷款报表
 */
export function getHouseOutputList () {
  return request({
    url: '/output',
    method: 'get'
  })
}

/**
 * 二手房报表相关接口，重新生成二手房贷款报表
 */
export function generateHouseOutputList () {
  return request({
    url: '/output/createHouse',
    method: 'get'
  })
}

/**
 * 报表相关接口，获取抵押贷款报表
 */
export function getMortgageOutputList () {
  return request({
    url: '/output/mortgage',
    method: 'get'
  })
}

/**
 * 二手房报表相关接口，重新生成抵押贷款报表
 */
export function generateMortgageOutputList () {
  return request({
    url: '/output/createMortgage',
    method: 'get'
  })
}
