import { loginReq, logoutReq, getInfoReq } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    //token: getToken(),
    username: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  M_username: (state, username) => {
    state.username = username
  },
  M_roles: (state, roles) => {
    state.roles = roles
  }
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
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
          //此处模拟数据
          const rolesArr = localStorage.getItem('roles')
          if (rolesArr) {
            data.roles = JSON.parse(rolesArr)
          } else {
            data.roles = ['admin']
            localStorage.setItem('roles', JSON.stringify(data.roles))
          }
          const { roles, username } = data
          commit('M_username', username)
          commit('M_roles', roles)
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
