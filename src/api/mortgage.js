import qs from 'qs'
import request from '@/utils/request'

// 抵押贷款api

// ***********************接单开始***************************
export function saveCheckList (checklist, employeeId) {
  return request({
    url: '/checklist/save',
    method: 'post',
    data: qs.stringify({
      checklist,
      employeeId
    })
  })
}
export function getCheckList (checklistId) {
  return request({
    url: `/checklist/${checklistId}`,
    method: 'get'
  })
}
// ***********************接单结束***************************

// ***********************面谈开始***************************
// 根据id获取某人的面谈任务
export function getInterview (id) {
  return request({
    url: `/task/m/view/${id}`,
    method: 'get'
  })
}
// 获取所有的面谈任务列表
export function getInterviewList () {
  return request({
    url: '/task/m/view',
    method: 'get'
  })
}
// 添加面谈建议
export function saveInterviewSuggestion (advice, taskId, employeeId) {
  return request({
    url: '/view/save',
    method: 'post',
    data: qs.stringify({
      advice,
      taskId,
      employeeId
    })
  })
}
// 废单
export function wasteSheet (time, taskId, employeeId) {
  return request({
    url: '/view/suspend',
    method: 'post',
    data: qs.stringify({
      time,
      taskId,
      employeeId
    })
  })
}
// ***********************面谈结束***************************

// ***********************面签开始***************************
// 获取所有面签列表
export function getVisaInterviewList () {
  return request({
    url: '/task/m/visa',
    method: 'get'
  })
}
// 根据用户id获取面签
export function getVisaInterview (id) {
  return request({
    url: `/task/m/visa/${id}`,
    method: 'get'
  })
}
// 根据id获取面签部分的资料目录表
export function getVisaInterviewform (catalogId) {
  return request({
    url: `/visa/catalog/${catalogId}`,
    method: 'get'
  })
}
// 保存资料目录表
export function saveVisaInterviewCatalog (catalog, taskId, employeeId) {
  return request({
    url: '/visa/catalog/save',
    method: 'post',
    data: qs.stringify({
      catalog,
      taskId,
      employeeId
    })
  })
}

// 根据id获取面签部分的个人贷款申请表
export function getVisaInterviewForm (formId) {
  return request({
    url: `/visa/form/${formId}`,
    method: 'get'
  })
}
// 保存个人贷款申请表
export function saveVisaInterviewForm (form, taskId) {
  return request({
    url: '/visa/form/save',
    method: 'post',
    data: qs.stringify({
      form,
      taskId
    })
  })
}
// 保存面签
export function saveVisaInterview (time, address, taskId) {
  return request({
    url: '/visa/save',
    method: 'post',
    data: qs.stringify({
      time,
      address,
      taskId
    })
  })
}

// ***********************面签结束***************************

// 评估下单
export function getEvaluateOrderList () {
  return request({
    url: '/evaluateOrder/getEvaluateOrderList',
    method: 'get'
  })
}

// 审批
export function getExamineApproveList () {
  return request({
    url: '/examineApprove/getExamineApproveList',
    method: 'get'
  })
}

// 抵押
export function getMortgageList () {
  return request({
    url: '/mortgage/getMortgageList',
    method: 'get'
  })
}

// 放款
export function getMakeLoansList () {
  return request({
    url: '/makeLoans/getMakeLoansList',
    method: 'get'
  })
}

// 静态索引
export function getStaticIndexByKey (key) {
  return request({
    url: '/tableValue/value/{key}',
    method: 'get',
    params: {
      key
    }
  })
}
