import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getAccount () {
  return Cookies.get('account')
}

export function setAccount (account) {
  return Cookies.set('account', account)
}

export function removeAccount () {
  return Cookies.remove('account')
}

export function getUsername () {
  return Cookies.get('username')
}

export function setUsername (username) {
  return Cookies.set('username', username)
}

export function removeUsername () {
  return Cookies.remove('username')
}

export function getUserId () {
  return Cookies.get('user_id')
}

export function setUserId (user_id) {
  return Cookies.set('user_id', user_id)
}

export function removeUserId () {
  return Cookies.remove('user_id')
}

export function getDepartmentId () {
  return Cookies.get('department_id')
}

export function setDepartmentId (department_id) {
  return Cookies.set('department_id', department_id)
}

export function removeDepartmentId () {
  return Cookies.remove('department_id')
}
