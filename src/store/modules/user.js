import { loginByUsername, logout } from '@/api/login'
import { getToken, setToken, removeToken, getAccount, setAccount, removeAccount, getUsername, setUsername, removeUsername } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    account: getAccount(),
    username: getUsername()
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
    }
  },

  actions: {
    // 登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          setAccount(response.data.data)
          setToken(response.headers.token)
          setUsername(response.data.data.name)
          commit('SET_ACCOUNT', JSON.stringify(response.data.data))
          commit('SET_TOKEN', response.headers.token)
          commit('SET_USERNAME', response.data.data.name)
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
          commit('SET_TOKEN', '')
          commit('SET_ACCOUNT', '')
          commit('SET_USERNAME', '')
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
