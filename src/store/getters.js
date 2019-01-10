const getters = {
  sidebar: state => state.app.sidebar,
  // token: state => state.user.token,
  // account: state => state.user.account,
  phone: state => state.user.phone,
  username: state => state.user.username,
  userId: state => state.user.userId,
  departmentId: state => state.user.departmentId,
  permission: state => state.user.permission,
  unreadTodoCount: state => state.todo.unreadTodoCount,
  todoCount: state => state.todo.todoCount,
  successCount: state => state.todo.successCount,
  warningCount: state => state.todo.warningCount
}
export default getters
