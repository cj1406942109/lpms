import { login, logout } from '@/api/login'
import {
  getToken, setToken, removeToken,
  getAccount, setAccount, removeAccount,
  getUsername, setUsername, removeUsername,
  getUserId, setUserId, removeUserId,
  getDepartmentId, setDepartmentId, removeDepartmentId
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    account: getAccount(),
    username: getUsername(),
    user_id: getUserId(),
    department_id: getDepartmentId()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_USER_ID: (state, user_id) => {
      state.user_id = user_id
    },
    SET_DEPARTMENT_ID: (state, department_id) => {
      state.department_id = department_id
    }
  },

  actions: {
    // 登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const responseData = response.data.data
          setAccount(responseData.account)
          setToken(responseData.token)
          setUsername(responseData.name)
          setUserId(responseData.id)
          setDepartmentId(responseData.department_id)
          commit('SET_ACCOUNT', responseData.account)
          commit('SET_TOKEN', responseData.token)
          commit('SET_USERNAME', responseData.name)
          commit('SET_USER_ID', responseData.id)
          commit('SET_DEPARTMENT_ID', responseData.department_id)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetUserInfo ({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          removeToken()
          removeAccount()
          removeUsername()
          removeUserId()
          removeDepartmentId()
          commit('SET_TOKEN', '')
          commit('SET_ACCOUNT', '')
          commit('SET_USERNAME', '')
          commit('SET_USER_ID', '')
          commit('SET_DEPARTMENT_ID', '')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
