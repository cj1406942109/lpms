import qs from 'qs'
import request from '@/utils/request'

// 抵押贷款api
// ************************* 以下为v2 *******************************

// ************************* 主任务开始 *******************************

/**
 * 创建新的抵押任务
 * @param {*} employeeId 员工id
 */
export function createTask (employeeId) {
  return request({
    url: '/mortgage',
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
    url: `/mortgage/${mortgageId}`,
    method: 'get'
  })
}

// ************************* 主任务结束 *******************************

// ************************* 接单开始 *******************************
/**
 * 保存接单表
 * @param {*} checkList 接单表对象
 * @param {*} checklistId 接单表id
 */
export function saveChecklist ({
  datetime,
  clientName,
  clientPhone,
  clientIdType,
  clientIdNumber,
  clientWorkType,
  clientWorkUnit,
  loanVariety,
  loanAmount,
  loanPeriod,
  checklistSource,
  agentName,
  remark,
  houses
}, checklistId) {
  return request({
    url: `/mortgage/checklist/${checklistId}`,
    method: 'post',
    data: qs.stringify({
      checklistId,
      datetime,
      clientName,
      clientPhone,
      clientIdType,
      clientIdNumber,
      clientWorkType,
      clientWorkUnit,
      loanVariety,
      loanAmount,
      loanPeriod,
      checklistSource,
      agentName,
      remark,
      houses: JSON.stringify(houses)
    })
  })
}

/**
 * 根据接单表id获取接单表
 * @param {*} checklistId 接单表id
 */
export function getChecklistById (checklistId) {
  return request({
    url: `/mortgage/checklist/${checklistId}`,
    method: 'get'
  })
}
// ************************* 接单结束 *******************************

// ************************* 面谈开始 *******************************

/**
 * 获取面谈列表
 */
export function getViewList () {
  return request({
    url: '/mortgage/view',
    method: 'get'
  })
}
/**
 * 根据员工id获取面谈列表
 * @param {*} employeeId 员工id
 */
export function getViewListByEmployeeId (employeeId) {
  return request({
    url: `/mortgage/view/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 保存面谈数据
 * @param {*} param0 面谈建议表
 * @param {*} viewId 面谈id
 */
export function saveView ({
  finishTime,
  proposedInstitution,
  proposedClerk,
  proposedAmount,
  proposedTime,
  rate,
  repaymentType,
  clientPurposeType,
  clientPurpose,
  surveyOpinion
}, viewId) {
  return request({
    url: `/mortgage/view/${viewId}`,
    method: 'post',
    data: qs.stringify({
      viewId,
      finishTime,
      proposedInstitution,
      proposedClerk,
      proposedAmount,
      proposedTime,
      rate,
      repaymentType,
      clientPurposeType,
      clientPurpose,
      surveyOpinion
    })
  })
}
// ************************* 面谈结束 *******************************

// ************************* 面签开始 *******************************

/**
 * 获取面签列表
 */
export function getVisaList () {
  return request({
    url: '/mortgage/visa',
    method: 'get'
  })
}
/**
 * 根据员工id获取面签列表
 * @param {*} employeeId 员工id
 */
export function getVisaListByEmployeeId (employeeId) {
  return request({
    url: `/mortgage/visa/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 根据面签id获取面签表单数据
 * @param {*} visaId 面签id
 */
export function getVisaById (visaId) {
  return request({
    url: `/mortgage/visa/${visaId}`,
    method: 'get'
  })
}

/**
 * 保存资料目录表
 * @param {*} catalog 资料目录表
 */
export function saveCatalog (catalog) {
  return request({
    url: `/mortgage/visa/catalog`,
    method: 'post',
    data: qs.stringify({
      catalog: JSON.stringify(catalog)
    })
  })
}

/**
 * 保存个人贷款申请表
 * @param {*} form 个人贷款申请表
 */
export function saveForm (form) {
  return request({
    url: `/mortgage/visa/form`,
    method: 'post',
    data: qs.stringify({
      form: JSON.stringify(form)
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
    url: `/mortgage/visa/confirm`,
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
    url: '/mortgage/order',
    method: 'get'
  })
}

/**
 * 根据id获取员工的评估下单列表
 * @param {*} employeeId 员工id
 */
export function getOrderListByEmployeeId (employeeId) {
  return request({
    url: `/mortgage/order/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 根据id获取评估下单
 * @param {*} orderId id
 */
export function getOrderById (orderId) {
  return request({
    url: `/mortgage/order/${orderId}`,
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
    url: `/mortgage/order/confirm`,
    method: 'post',
    data: qs.stringify({
      orderId,
      time,
      company
    })
  })
}

export function saveReport (reportId, time, type, report) {
  return request({
    url: `/mortgage/order/report/${reportId}`,
    method: 'post',
    data: qs.stringify({
      time,
      type,
      report: JSON.stringify(report)
    })
  })
}
// export function getHouseInfoByOrderId (orderId) {
//   return request({
//     url: `/mortgage/order/house/${orderId}`,
//     method: 'get',
//     params: {
//       orderId
//     }
//   })
// }
// ************************* 评估下单结束 *******************************

// ************************* 审批开始 *******************************

/**
 * 获取审批列表
 */
export function getApproveList () {
  return request({
    url: '/mortgage/approve',
    method: 'get'
  })
}

/**
 * 根据id获取员工的审批列表
 * @param {*} employeeId 员工id
 */
export function getApproveListByEmployeeId (employeeId) {
  return request({
    url: `/mortgage/approve/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 根据id获取报审流程数据
 * @param {*} approveId 报审id
 */
export function getApproveById (approveId) {
  return request({
    url: `/mortgage/approve/${approveId}`,
    method: 'get'
  })
}

/**
 * 确定资料目录表已收齐
 * @param {*} approveId 审批id
 * @param {*} catalog 资料目录表
 */
export function confirmCatalog (approveId, catalog) {
  return request({
    url: `/mortgage/approve/confirmCatalog`,
    method: 'post',
    data: qs.stringify({
      approveId,
      catalog: JSON.stringify(catalog)
    })
  })
}

/**
 * 完成报审
 * @param {*} approveId 报审id
 * @param {*} time 时间
 */
export function completeApprove (approveId, time) {
  return request({
    url: `/mortgage/approve/complete/${approveId}`,
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
    url: `/mortgage/approve/${approveId}`,
    method: 'post',
    data: qs.stringify({
      approve: JSON.stringify(approve)
    })
  })
}

/**
 * 保存正评
 * @param {*} approveId 审批id
 * @param {*} time 时间
 * @param {*} report 正评报告
 */
export function saveFormalReport (approveId, time, report) {
  return request({
    url: '/mortgage/approve/formalReport',
    method: 'post',
    data: qs.stringify({
      approveId,
      time,
      report: JSON.stringify(report)
    })
  })
}

/**
 * 结束当前审批流程
 * @param {*} approveId 审批id
 */
export function skipApprove (approveId) {
  return request({
    url: `/mortgage/approve/skip/${approveId}`,
    method: 'post'
  })
}
// ************************* 审批结束 *******************************

// ************************* 抵押开始 *******************************

/**
 * 获取抵押列表
 */
export function getMortgageList () {
  return request({
    url: '/mortgage/mortgage',
    method: 'get'
  })
}

/**
 * 根据id获取员工的抵押列表
 * @param {*} employeeId 员工id
 */
export function getMortgageListByEmployeeId (employeeId) {
  return request({
    url: `/mortgage/mortgage/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 根据抵押id获取抵押数据
 * @param {*} mortgageId 抵押id
 */
export function getMortgageById (mortgageId) {
  return request({
    url: `/mortgage/mortgage/${mortgageId}`,
    method: 'get'
  })
}

/**
 * 确定抵押状态
 * @param {*} mortgageId 抵押id
 * @param {*} time 时间
 * @param {*} isNeedGuarantee 是否需要担保函
 */
export function confirmMortgageStatus (mortgageId, time, isNeedGuarantee) {
  return request({
    url: `mortgage/mortgage/${mortgageId}`,
    method: 'post',
    data: qs.stringify({
      time,
      isNeedGuarantee
    })
  })
}

/**
 * 担保函审批
 * @param {*} mortgageId 抵押id
 * @param {*} approvePass 审批结果
 * @param {*} approvePassTime 审批通过时间
 */
export function guaranteeApprove (mortgageId, approvePass, approvePassTime) {
  return request({
    url: `mortgage/mortgage/guaranteeApprove/${mortgageId}`,
    method: 'post',
    data: qs.stringify({
      approvePass,
      approvePassTime
    })
  })
}

/**
 * 出担保函
 * @param {*} mortgageId 抵押id
 * @param {*} approvePassTime 审批通过时间
 * @param {*} guaranteePublishTime 出担保函时间
 */
export function guaranteePublish (mortgageId, approveResult, approvePassTime, guaranteePublishTime) {
  return request({
    url: `/mortgage/mortgage/guaranteePublish/${mortgageId}`,
    method: 'post',
    data: qs.stringify({
      approveResult,
      approvePassTime,
      guaranteePublishTime
    })
  })
}

/**
 * 跳过抵押，结束当前抵押流程
 * @param {*} mortgageId 抵押id
 */
export function skipMortgage (mortgageId) {
  return request({
    url: `/mortgage/mortgage/${mortgageId}/pass`,
    method: 'post'
  })
}

// ************************* 抵押结束 *******************************

// ************************* 收费开始 *******************************

/**
 * 获取收费列表
 */
export function getChargeList () {
  return request({
    url: '/mortgage/charge',
    method: 'get'
  })
}

/**
 * 根据id获取员工的收费列表
 * @param {*} employeeId 员工id
 */
export function getChargeListByEmployeeId (employeeId) {
  return request({
    url: `/mortgage/charge/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 确定收费
 * @param {*} chargeId 收费id
 * @param {*} time 收费时间
 */
export function confirmCharge (chargeId, time) {
  return request({
    url: `/mortgage/charge/${chargeId}`,
    method: 'post',
    data: qs.stringify({
      time
    })
  })
}

// ************************* 收费结束 *******************************

// ************************* 放款开始 *******************************

/**
 * 获取放款列表
 */
export function getLoanList () {
  return request({
    url: '/mortgage/loan',
    method: 'get'
  })
}

/**
 * 根据id获取员工的放款列表
 * @param {*} employeeId 员工id
 */
export function getLoanListByEmployeeId (employeeId) {
  return request({
    url: `/mortgage/loan/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 根据id获取放款
 * @param {*} loanId id
 */
export function getLoanById (loanId) {
  return request({
    url: `/mortgage/loan/${loanId}`,
    method: 'get'
  })
}

export function confirmLoan (loanId) {
  return request({
    url: `/mortgage/loan/${loanId}`,
    method: 'post'
  })
}

// ************************* 放款结束 *******************************

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

// ************************* 以上为v2 *******************************
