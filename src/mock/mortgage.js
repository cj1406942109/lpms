import Mock from 'mockjs'

const count = parseInt(Math.random() * 20)

// 面谈
const interview = Mock.mock({
  no: '@id()',
  clientName: '@cname()',
  contactInfo: /1[1-9]{10}/,
  status: /表格未填写|表格填写已完成/
})

const interviewList = []
for (let i = 0; i < count; i++) {
  interviewList.push(Mock.mock({
    no: '@id()',
    clientName: '@cname()',
    contactInfo: /1[1-9]{10}/,
    status: /表格未填写|表格填写已完成/
  }))
}

// 面签
const visaInterview = Mock.mock({
  no: '@id()',
  clientName: '@cname()',
  contactInfo: /1[1-9]{10}/,
  status: /待约定签约时间|待确定签约状态/
})

const visaInterviewList = []
for (let i = 0; i < count; i++) {
  visaInterviewList.push(Mock.mock({
    no: '@id()',
    clientName: '@cname()',
    contactInfo: /1[1-9]{10}/,
    status: /待约定签约时间|待确定签约状态/
  }))
}

// 评估下单
const evaluateOrderList = []
for (let i = 0; i < count; i++) {
  evaluateOrderList.push(Mock.mock({
    no: '@id()',
    clientName: '@cname()',
    contactInfo: /1[1-9]{10}/,
    visaInterviewOperator: '@cname()',
    visaInterviewFinishTime: '@datetime()',
    status: /待评估下单|待出报告/
  }))
}

// 审批
const examineApproveList = []
for (let i = 0; i < count; i++) {
  examineApproveList.push(Mock.mock({
    no: '@id()',
    clientName: '@cname()',
    contactInfo: /1[1-9]{10}/,
    reportType: /正评|预评/,
    status: /资料待收齐|待出正评|待支行审批|待分行审批/
  }))
}

// 抵押
const mortgageList = []
for (let i = 0; i < count; i++) {
  mortgageList.push(Mock.mock({
    no: '@id()',
    clientName: '@cname()',
    contactInfo: /1[1-9]{10}/,
    status: /待确定抵押时间|待确定抵押状态/
  }))
}

// 放款
const makeLoansList = []
for (let i = 0; i < count; i++) {
  makeLoansList.push(Mock.mock({
    no: '@id()',
    clientName: '@cname()',
    contactInfo: /1[1-9]{10}/,
    status: /等待提交担保函与收费明细|等待放款/
  }))
}

export default {
  getInterview: () => {
    return interview
  },
  getInterviewList: () => {
    return interviewList
  },
  getVisaInterview: () => {
    return visaInterview
  },
  getVisaInterviewList: () => {
    return visaInterviewList
  },
  getEvaluateOrderList: () => {
    return evaluateOrderList
  },
  getExamineApproveList: () => {
    return examineApproveList
  },
  getMortgageList: () => {
    return mortgageList
  },
  getMakeLoansList: () => {
    return makeLoansList
  }
}
