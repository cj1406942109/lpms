import qs from 'qs'
import request from '@/utils/request'

// 抵押贷款api

// ***********************接单开始***************************
// export function saveCheckList (checklist, employeeId) {
//   return request({
//     url: '/checklist/save',
//     method: 'post',
//     data: qs.stringify({
//       checklist,
//       employeeId
//     })
//   })
// }
export function getCheckList (checklistId) {
  return request({
    url: `/checklist/${checklistId}`,
    method: 'get'
  })
}
// ***********************接单结束***************************

// ***********************面谈开始***************************
// 根据id获取某人的面谈任务
export function getInterviewById (id) {
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
export function wasteSheet (taskId, employeeId) {
  return request({
    url: '/view/suspend',
    method: 'post',
    data: qs.stringify({
      taskId,
      employeeId
    })
  })
}
// 获取可分配用户列表
export function getAssignUserList (departmentId) {
  return request({
    url: `/employee/allModel/${departmentId}`,
    method: 'get'
  })
}
// 分配任务
export function assignTaskToUser (taskId, employeeId) {
  return request({
    url: '/task/m/assign',
    method: 'post',
    data: qs.stringify({
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
export function getVisaInterviewById (id) {
  return request({
    url: `/task/m/visa/${id}`,
    method: 'get'
  })
}

// 根据贷款id，检查面签状态
export function checkVisaStatus (loanId) {
  return request({
    url: '/task/m/checkVisaStatus',
    method: 'get',
    params: { loanId }
  })
}

// 根据id获取面签部分的资料目录表
export function getVisaInterviewCatalog (catalogId) {
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

// ***********************评估下单开始***************************
// 根据员工id获取评估下单列表
export function getOrderListById (employeeId) {
  return request({
    url: `/task/m/order/${employeeId}`,
    method: 'get'
  })
}
export function checkOrderStatus (loanId) {
  return request({
    url: '/task/m/checkOrderStatus',
    method: 'get',
    params: {
      loanId
    }
  })
}
export function setOrderStatus (time, company, taskId) {
  return request({
    url: '/order/state/save',
    method: 'post',
    data: qs.stringify({
      time,
      company,
      taskId
    })
  })
}
export function saveReports (time, type, reports, taskId) {
  return request({
    url: '/order/report/save',
    method: 'post',
    data: qs.stringify({
      time,
      type,
      reports,
      taskId
    })
  })
}
// ***********************评估下单结束***************************

// ***********************审批开始***************************

export function getApproveListById (employeeId) {
  return request({
    url: `/task/m/approve/${employeeId}`,
    method: 'get'
  })
}
export function confirmCatalogComplete (taskId, employeeId, catalog) {
  return request({
    url: '/approve/completeData',
    method: 'post',
    data: qs.stringify({
      taskId,
      employeeId,
      catalog
    })
  })
}

export function finishBaoshen (time, taskId) {
  return request({
    url: '/approve/submit',
    method: 'post',
    data: qs.stringify({
      time,
      taskId
    })
  })
}

export function getLoanCondition () {
  return request({
    url: '/loanCondition/all',
    method: 'get'
  })
}

// export function confirmApproveStatus (approve, taskId) {
//   return request({
//     url: '/approve/save',
//     method: 'post',
//     data: qs.stringify({
//       approve,
//       taskId
//     })
//   })
// }
// export function saveReport (time, reports, taskId) {
//   return request({
//     url: '/approve/report/save',
//     method: 'post',
//     data: qs.stringify({
//       time,
//       reports,
//       taskId
//     })
//   })
// }

// ***********************审批结束***************************

// ***********************抵押结束***************************

export function getMortgageListById (employeeId) {
  return request({
    url: `/task/m/mortgage/${employeeId}`,
    method: 'get'
  })
}

export function confirmMortgage (time, taskId) {
  return request({
    url: '/mortgage/confirm',
    method: 'post',
    data: qs.stringify({
      time,
      taskId
    })
  })
}

export function guaranteeFlow (needStamp, stampTime, guaranteeTime, taskId, loanId) {
  return request({
    url: '/mortgage/guarantee',
    method: 'post',
    data: qs.stringify({
      needStamp,
      stampTime,
      guaranteeTime,
      taskId,
      loanId
    })
  })
}
// ***********************抵押结束***************************

// ***********************收费开始***************************

export function getChargeListById (employeeId) {
  return request({
    url: `/task/m/charge/${employeeId}`,
    method: 'get'
  })
}

export function confirmCharge (time, taskId) {
  return request({
    url: '/charge/confirm',
    method: 'post',
    data: qs.stringify({
      time,
      taskId
    })
  })
}

// ***********************收费结束***************************

// ***********************放款开始***************************

export function getLoanListById (employeeId) {
  return request({
    url: `/task/m/loan/${employeeId}`,
    method: 'get'
  })
}

// export function confirmLoan (taskId) {
//   return request({
//     url: '/loan/confirm',
//     method: 'post',
//     data: qs.stringify({
//       taskId
//     })
//   })
// }

// ***********************放款结束***************************

// 静态索引
// export function getStaticIndexByKey (key) {
//   return request({
//     url: '/tableValue/value/{key}',
//     method: 'get',
//     params: {
//       key
//     }
//   })
// }

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
    url: `/mortgage/approve/employee/${approveId}`,
    method: 'get'
  })
}

/**
 * 确定资料目录表已收齐
 * @param {*} catalog 资料目录表
 */
export function confirmCatalog (catalog) {
  return request({
    url: `/mortgage/approve/confirmCatalog`,
    method: 'post',
    data: qs.stringify({
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
