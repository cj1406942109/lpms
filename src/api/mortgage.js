import qs from 'qs'
import request from '@/utils/request'

// 接单
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
export function emptyCheckList () {
  return request({
    url: '/empty/m/checklist',
    method: 'get'
  })
}

// 面谈
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

// 面签
export function getVisaInterview () {
  return request({
    url: '/visaInterview/getVisaInterview',
    method: 'get'
  })
}

export function getVisaInterviewList () {
  return request({
    url: '/visaInterview/getVisaInterviewList',
    method: 'get'
  })
}

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
