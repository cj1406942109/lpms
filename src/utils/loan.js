// TODO: 代码重构，编写工具类，挂载到Vue根节点上

/**
 * 贷款类型映射，编号转中文
 * @param {int} loanType 贷款类型
 */
export function formateLoanType (loanType) {
  switch (parseInt(loanType)) {
    case 20:
      return '抵押消费'
    case 21:
      return '抵押经营'
    default:
      return '未知类型'
  }
}

/**
 * 给贷款类型打标签
 * @param {int} loanType 贷款类型
 */
export function tagLoanType (loanType) {
  switch (parseInt(loanType)) {
    case 20:
      return 'primary'
    case 21:
      return 'success'
    default:
      return 'info'
  }
}
/**
 * 流程名称转换
 * @param {string} flowName 英文流程名称
 */
export function formateFlowName (flowName) {
  switch (flowName) {
    case 'ViewTask':
      return '面谈'
    case 'VisaTask':
      return '面签'
    case 'OrderTask':
      return '评估下单'
    case 'ApproveTask':
      return '审批'
    case 'MortgageTask':
      return '抵押'
    case 'LoanTask':
      return '放款'
    default:
      return '其他流程'
  }
}
