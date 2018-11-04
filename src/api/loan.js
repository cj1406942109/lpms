import qs from 'qs'
import request from '@/utils/request'

// 贷款管理api

export function getMortgageList () {
  return request({
    url: '/task/m/view',
    method: 'get'
  })
}

/**
 * 查询订单列表
 * @param {*} loanType 贷款类型
 * @param {*} loanNumber 贷款编号
 * @param {*} clientName 客户姓名
 * @param {*} IDCard 客户身份证号
 * @param {*} employeeName 经办人员
 * @param {*} bank 经办银行
 * @param {*} startDate 开始日期
 * @param {*} endDate 结束日期
 * @param {*} pageNo 当前页数
 * @param {*} pageSize 当前页数显示的记录数
 */
export function getOrderList (loanType, loanNumber, clientName, IDCard, employeeName, bank, startDate, endDate, pageNo, pageSize) {
  return request({
    url: '/orderManage/queryOrder',
    method: 'get',
    params: {
      loanType, loanNumber, clientName, IDCard, employeeName, bank, startDate, endDate, pageNo, pageSize
    }
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
