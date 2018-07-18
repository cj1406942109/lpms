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
  return Cookies.get('account') ? JSON.parse(Cookies.get('account')) : ''
}

export function setAccount (account) {
  return Cookies.set('account', JSON.stringify(account))
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
