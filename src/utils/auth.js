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

export function getPhone () {
  return Cookies.get('phone')
}

export function setPhone (phone) {
  return Cookies.set('phone', phone)
}

export function removePhone () {
  return Cookies.remove('phone')
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
  return Cookies.get('userId')
}

export function setUserId (userId) {
  return Cookies.set('userId', userId)
}

export function removeUserId () {
  return Cookies.remove('userId')
}

export function getDepartmentId () {
  return Cookies.get('departmentId')
}

export function setDepartmentId (departmentId) {
  return Cookies.set('departmentId', departmentId)
}

export function removeDepartmentId () {
  return Cookies.remove('departmentId')
}

export function getPermission () {
  return sessionStorage.getItem('permission')
}

export function setPermission (permission) {
  return sessionStorage.setItem('permission', permission)
}

export function removePermission () {
  return sessionStorage.removeItem('permission')
}
