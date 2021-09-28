import { loginReq, logoutReq, getInfoReq } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  name: '',
  avatar: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
  roles: ['admin']
}

const mutations = {
  SET_NAME: (state, username) => {
    state.name = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      loginReq(data)
        .then((res) => {
          if (res.code === 20000) {
            //commit('SET_Token', res.data?.jwtToken)
            setToken(res.data?.jwtToken)
            resolve()
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfoReq()
        .then((response) => {
          const { data } = response
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          const { username } = data
          commit('SET_NAME', username)
          // commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user logout
  logout() {
    return new Promise((resolve, reject) => {
      logoutReq()
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // remove token
  resetToken() {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
