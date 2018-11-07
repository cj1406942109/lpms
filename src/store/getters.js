const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  account: state => state.user.account,
  username: state => state.user.username,
  userId: state => state.user.userId,
  departmentId: state => state.user.departmentId
}
export default getters
