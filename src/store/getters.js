const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  account: state => state.user.account,
  username: state => state.user.username,
  user_id: state => state.user.user_id,
  department_id: state => state.user.department_id
}
export default getters
