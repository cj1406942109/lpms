import Mock from 'mockjs'

const count = parseInt(Math.random() * 20)

const notice = Mock.mock({
  title: '@ctitle()',
  date: '@datetime()',
  tag: /已读|未读/,
  content: '@cparagraph(5, 10)'
})

const noticeList = []
for (let i = 0; i < count; i++) {
  noticeList.push(Mock.mock({
    title: '@ctitle()',
    date: '@datetime()',
    img: '@dataImage("200x100")',
    tag: /已读|未读/,
    content: '@cparagraph(5, 10)'
  }))
}

const todoList = []
const todoStatusList = ['正在面谈', '正在面签', '正在评估下单', '正在审批', '正在抵押']

for (let i = 0; i < count; i++) {
  todoList.push(Mock.mock({
    no: '@id()',
    type: /抵押贷款|二手房贷款/,
    status: `@pick(${todoStatusList})`,
    desc: '@csentence()'
  }))
}

const entranceNameList = ['接单', '面谈', '面签', '评估下单', '审批', '抵押', '放款']
const entranceList1 = []
const entranceList2 = []
for (let i = 0; i < parseInt(Math.random() * 7); i++) {
  const newItem = Mock.mock(`@pick(${entranceNameList})`)
  if (entranceList1.indexOf(newItem) < 0) {
    entranceList1.push(newItem)
  }
}

for (let i = 0; i < parseInt(Math.random() * 7); i++) {
  const newItem = Mock.mock(`@pick(${entranceNameList})`)
  if (entranceList2.indexOf(newItem) < 0) {
    entranceList2.push(newItem)
  }
}

export default {
  getNotice: () => {
    return {
      data: notice,
      extra: 0,
      result: true,
      statusCode: 200
    }
  },
  getNoticeList: () => {
    return {
      data: noticeList,
      extra: 0,
      result: true,
      statusCode: 200
    }
  },
  getTodoList: () => {
    return todoList
  },
  getQuickEntrance: () => {
    return {
      data: {
        diya: entranceList1,
        ershoufang: entranceList2
      },
      extra: 0,
      result: true,
      statusCode: 200
    }
  }
}
