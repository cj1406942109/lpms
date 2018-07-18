import Mock from 'mockjs'
import loginAPI from './login'
import dashboardAPI from './dashboard'

import mortgageAPI from './mortgage'
import systemAPI from './system'

// 登录
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 首页
Mock.mock(/\/todo\/getList/, 'get', dashboardAPI.getTodoList)
Mock.mock(/\/quickEntrance\/getQuickEntrance/, 'get', dashboardAPI.getQuickEntrance)
Mock.mock(/\/notice\/getNoticeList/, 'get', dashboardAPI.getNoticeList)
Mock.mock(/\/notice\/getNotice/, 'get', dashboardAPI.getNotice)

// 抵押贷款
Mock.mock(/\/interview\/getInterview/, 'get', mortgageAPI.getInterviewList)
Mock.mock(/\/visaInterview\/getVisaInterviewList/, 'get', mortgageAPI.getVisaInterviewList)
Mock.mock(/\/evaluateOrder\/getEvaluateOrderList/, 'get', mortgageAPI.getEvaluateOrderList)
Mock.mock(/\/examineApprove\/getExamineApproveList/, 'get', mortgageAPI.getExamineApproveList)
Mock.mock(/\/mortgage\/getMortgageList/, 'get', mortgageAPI.getMortgageList)
Mock.mock(/\/makeLoans\/getMakeLoansList/, 'get', mortgageAPI.getMakeLoansList)

// 系统管理
Mock.mock(/\/account\/getAccountList/, 'get', systemAPI.getAccountList)

export default Mock
