import { getTaskListByEmployeeId as getTaskMListByEmployeeId } from '@/api/mortgage'
import { getTaskListByEmployeeId as getTaskHListByEmployeeId } from '@/api/house'
import store from '@/store'
import router from '@/router'
import { Notification } from 'element-ui'

const todo = {
  state: {
    unreadTodoCount: 0,
    todoCount: 0,
    successCount: 0,
    warningCount: 0,
    todoList: []
  },
  mutations: {
    SET_TODO_LIST (state, list) {
      state.unreadTodoCount = 0
      const todoListMap = {}
      state.todoList.forEach(todo => {
        if (!todoListMap[todo.id]) {
          todoListMap[todo.id] = todo
        }
      })
      list.forEach(todo => {
        if (!todoListMap[todo.id] && todo.state !== 'finish') {
          state.unreadTodoCount++
        }
      })
      if (state.unreadTodoCount > 0) {
        const notification = Notification({
          title: '提示',
          iconClass: 'el-icon-question',
          customClass: 'notification-todo',
          message: `有${state.unreadTodoCount}条新的待办事项`,
          duration: 0,
          offset: 40,
          onClick () {
            notification.close()
            router.push({ path: '/quickpath/todo' })
          }
        })
      }
      state.successCount = list.filter(todo => {
        return todo.state === 'finish'
      }).length
      state.todoCount = list.filter(todo => {
        return todo.state !== 'finish'
      }).length
      state.todoList = list
    }
  },
  actions: {
    getTodoList ({ commit, dispatch }) {
      let listM = []
      let listH = []
      Promise.all([
        getTaskMListByEmployeeId(store.state.user.userId).then(data => {
          if (data) {
            listM = data
          }
        }),
        getTaskHListByEmployeeId(store.state.user.userId).then(data => {
          if (data) {
            listH = data
          }
        })
      ]).then(() => {
        const todoList = listM.concat(listH)
        commit('SET_TODO_LIST', todoList)
      })
    }
  }
}

export default todo
