import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { setLocalStorage } from '@/utils/localStorage'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  permissionRoutesMap: [], // 用户的权限路由表
  keepPassword: false // 是否让浏览器记住密码
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_KEEPPASSWORD: (state) => {
    state.keepPassword = !state.keepPassword
  }
}

const actions = {
  // user login
  login({ state, commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const account = { username: username.trim(), password: password }
      login(account).then(response => {
        // 登录成功后，若用户点击了 记住密码，把用户存入 localstorage
        if (state.keepPassword) {
          setLocalStorage(account, 'account')
        }
        const data = response.result
        commit('SET_TOKEN', data.resultData.token) // 'admin-token'
        setToken(data.resultData.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { name, avatar } = response
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')

        dispatch('permission/resetPermissionRoutes', {}, { root: true })

        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // 登录页 用户点击 是否 记住密码
  toggleKeepPassword({ commit }) {
    commit('SET_KEEPPASSWORD')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

