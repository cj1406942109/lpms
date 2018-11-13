/*
 * @Author: Abraham
 * @Username: cj1406942109
 * @Email: 1406942109@qq.com
 * @GitHub: https://github.com/cj1406942109
 * @Date: 2018-11-06 17:31:54
 * @LastEditors: Abraham
 * @LastEditTime: 2018-11-13 13:26:09
 * @Description: 二手房贷款api
 */

import qs from 'qs'
import request from '@/utils/request'

// ************************* 主任务开始 *******************************

/**
 * 创建新的二手房任务
 * @param {*} employeeId 员工id
 */
export function createTask (employeeId) {
  return request({
    url: '/house',
    method: 'post',
    data: qs.stringify({
      employeeId
    })
  })
}

/**
 * 根据贷款id获取贷款子流程进度列表
 * @param {*} mortgageId 贷款id
 */
export function getTaskById (mortgageId) {
  return request({
    url: `/house/${mortgageId}`,
    method: 'get'
  })
}

/**
 * 根据员工id获取二手房贷款任务列表
 * @param {*} employeeId 员工id
 */
export function getTaskListByEmployeeId (employeeId) {
  return request({
    url: `/house/employee/${employeeId}`,
    method: 'get'
  })
}

// ************************* 主任务结束 *******************************

// ************************* 接单开始 *******************************

/**
 * 保存接单表
 * @param {*} checklistId 接单表id
 * @param {*} checkList 接单表
 */
export function saveChecklist (checklistId, checklist) {
  return request({
    url: `/house/checklist/${checklistId}`,
    method: 'post',
    data: qs.stringify({
      checklist: JSON.stringify(checklist)
    })
  })
}

/**
 * 根据接单表id获取接单表
 * @param {*} checklistId 接单表id
 */
export function getChecklistById (checklistId) {
  return request({
    url: `/house/checklist/${checklistId}`,
    method: 'get'
  })
}

/**
 * 获取接单表结构
 */
export function getChecklistStructure () {
  return request({
    url: '/house/checklist/houseChecklist/structure',
    method: 'get'
  })
}

// ************************* 接单结束 *******************************

// ************************* 面签开始 *******************************

/**
 * 获取面签列表
 */
export function getVisaList () {
  return request({
    url: '/house/visa',
    method: 'get'
  })
}
/**
 * 根据员工id获取面签列表
 * @param {*} employeeId 员工id
 */
export function getVisaListByEmployeeId (employeeId) {
  return request({
    url: `/house/visa/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 根据面签id获取面签表单数据
 * @param {*} visaId 面签id
 */
export function getVisaById (visaId) {
  return request({
    url: `/house/visa/${visaId}`,
    method: 'get'
  })
}

/**
 * 获取资料目录表结构
 */
export function getCatalogStructure () {
  return request({
    url: '/house/visa/catalog/structure',
    method: 'get'
  })
}

/**
 * 获取资料目录表其他字段结构
 */
export function getCatalogOtherStructure () {
  return request({
    url: '/house/visa/catalogOther/structure',
    method: 'get'
  })
}

/**
 * 保存资料目录表
 * @param {*} catalog 资料目录表
 */
export function saveCatalog (catalog) {
  return request({
    url: '/house/visa/catalog',
    method: 'post',
    data: qs.stringify({
      catalog: JSON.stringify(catalog)
    })
  })
}

/**
 * 确定签约状态
 * @param {*} visaId id
 * @param {*} time 完成时间
 * @param {*} address 约定地点
 */
export function confirmVisa (visaId, time, address) {
  return request({
    url: '/house/visa/confirm',
    method: 'post',
    data: qs.stringify({
      visaId,
      time,
      address
    })
  })
}

// ************************* 面签结束 *******************************

// ************************* 评估下单开始 *******************************

/**
 * 获取评估下单列表
 */
export function getOrderList () {
  return request({
    url: '/house/order',
    method: 'get'
  })
}

/**
 * 根据id获取员工的评估下单列表
 * @param {*} employeeId 员工id
 */
export function getOrderListByEmployeeId (employeeId) {
  return request({
    url: `/house/order/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 根据id获取评估下单
 * @param {*} orderId id
 */
export function getOrderById (orderId) {
  return request({
    url: `/house/order/${orderId}`,
    method: 'get'
  })
}

/**
 * 确定下单状态
 * @param {*} orderId id
 * @param {*} time 时间
 * @param {*} company 公司
 */
export function confirmOrder (orderId, time, company) {
  return request({
    url: '/house/order/confirm',
    method: 'post',
    data: qs.stringify({
      orderId,
      time,
      company
    })
  })
}

/**
 * 获取资料目录表其他字段结构
 */
export function getReportStructure () {
  return request({
    url: '/house/order/report/structure',
    method: 'get'
  })
}

/**
 * 保存报告
 * @param {*} orderId 订单id
 * @param {*} time 时间
 * @param {*} type 报告类型
 * @param {*} report 报告
 */
export function saveReport (orderId, time, type, report) {
  return request({
    url: `/house/order/report/${orderId}`,
    method: 'post',
    data: qs.stringify({
      time,
      type,
      report: JSON.stringify(report)
    })
  })
}

// ************************* 评估下单结束 *******************************

// ************************* 整件输机开始 *******************************

/**
 * 获取整件输机下单列表
 */
export function getInputList () {
  return request({
    url: '/house/input',
    method: 'get'
  })
}

/**
 * 根据id获取员工的整件输机列表
 * @param {*} employeeId 员工id
 */
export function getInputListByEmployeeId (employeeId) {
  return request({
    url: `/house/input/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 根据id获取整件输机
 * @param {*} orderId id
 */
export function getInputById (orderId) {
  return request({
    url: `/house/input/${orderId}`,
    method: 'get'
  })
}

/**
 * 完成房查征信
 * @param {*} orderId id
 * @param {*} houseTime 房查完成时间
 * @param {*} creditTime 征信完成时间
 */
export function confirmCheck (orderId, houseTime, creditTime) {
  return request({
    url: '	/house/input/check',
    method: 'post',
    data: qs.stringify({
      orderId,
      houseTime,
      creditTime
    })
  })
}

/**
 * 确定整件状态
 * @param {*} inutId id
 * @param {*} catalog 资料目录表
 */
export function confirmIntegrate (inutId, catalog) {
  return request({
    url: '/house/input/catalog',
    method: 'post',
    data: qs.stringify({
      inutId,
      catalog: JSON.stringify(catalog)
    })
  })
}

/**
 * 确定输机状态
 * @param {*} orderId id
 * @param {*} time 输机完成时间
 */
export function confirmInput (orderId, time) {
  return request({
    url: '	/house/input/check',
    method: 'post',
    data: qs.stringify({
      orderId,
      time
    })
  })
}

// ************************* 整件输机结束 *******************************

// ************************* 审批开始 *******************************

/**
 * 获取审批列表
 */
export function getApproveList () {
  return request({
    url: '/house/approve',
    method: 'get'
  })
}

/**
 * 根据id获取员工的审批列表
 * @param {*} employeeId 员工id
 */
export function getApproveListByEmployeeId (employeeId) {
  return request({
    url: `/house/approve/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 根据id获取报审流程数据
 * @param {*} approveId 报审id
 */
export function getApproveById (approveId) {
  return request({
    url: `/house/approve/${approveId}`,
    method: 'get'
  })
}

/**
 * 完成报审
 * @param {*} approveId 报审id
 * @param {*} time 时间
 */
export function completeApprove (approveId, time) {
  return request({
    url: `/house/approve/complete/${approveId}`,
    method: 'post',
    data: qs.stringify({
      time
    })
  })
}

/**
 * 确定报审状态
 * @param {*} approveId 报审id
 * @param {*} approve 报审表
 */
export function confirmApproveStatus (approveId, approve) {
  return request({
    url: `/house/approve/${approveId}`,
    method: 'post',
    data: qs.stringify({
      approve: JSON.stringify(approve)
    })
  })
}

// ************************* 审批结束 *******************************

// ************************* 表单字段及静态索引管理开始 *******************************

/**
 * 根据key获取索引列表
 * @param {string} key 索引key
 */
export function getStaticIndexByKey (key) {
  return request({
    url: '/tableValue/value',
    method: 'get',
    params: {
      key
    }
  })
}

// ************************* 表单字段及静态索引管理结束 *******************************
