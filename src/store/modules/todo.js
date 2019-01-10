import { getTaskListByEmployeeId as getTaskMListByEmployeeId } from '@/api/mortgage'
import { getTaskListByEmployeeId as getTaskHListByEmployeeId } from '@/api/house'
import store from '@/store'
import router from '@/router'
import { Notification } from 'element-ui'

const todo = {
  state: {
    isFirstLoad: false,
    unreadTodoCount: 0,
    todoList: []
  },
  mutations: {
    SET_TODO_LIST (state, list) {
      state.unreadTodoCount = 0
      if (state.isFirstLoad) {
        state.isFirstLoad = false
      } else {
        // const todoListMap = {}
        // state.todoList.forEach(todo => {
        //   if (!todoListMap[todo.id]) {
        //     todoListMap[todo.id] = todo
        //   }
        // })
        // list.forEach(todo => {
        //   if (!todoListMap[todo.id]) {
        //     state.unreadTodoCount++
        //   }
        // })
        state.unreadTodoCount = list.length
        if (state.unreadTodoCount > 0) {
          const notification = Notification({
            title: '提示',
            iconClass: 'el-icon-question',
            customClass: 'notification-todo',
            message: `有${state.unreadTodoCount}条新的待办事项`,
            duration: 0,
            onClick () {
              notification.close()
              router.push({ path: '/quickpath/todo' })
            }
          })
        }
      }
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
            listM = data.filter(todo => {
              return todo.state !== 'finish'
            })
          }
        }),
        getTaskHListByEmployeeId(store.state.user.userId).then(data => {
          if (data) {
            listH = data.filter(todo => {
              return todo.state !== 'finish'
            })
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
