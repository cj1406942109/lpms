import Mock from 'mockjs'

const count = parseInt(Math.random() * 20)

// 放款
const accountList = []
for (let i = 0; i < count; i++) {
  accountList.push(Mock.mock({
    name: '@cname()',
    account: '@first()',
    password: /[a-zA-Z0-9]{8,16}/,
    department: /业务部|综合管理部|权证部|行驻/,
    role: '员工'
  }))
}

export default {
  getAccountList: () => {
    return accountList
  }
}
