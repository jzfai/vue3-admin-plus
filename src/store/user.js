import { loginReq, logoutReq, getInfoReq } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import router, { asyncRoutes } from '@/router'
import { defineStore } from 'pinia'
import { usePermissionStore } from '@/store/permission'
import { useTagsViewStore } from '@/store/tagsView'

const resetRouter = () => {
  const asyncRouterNameArr = asyncRoutes.map((mItem) => mItem.name)
  asyncRouterNameArr.forEach((name) => {
    if (router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      username: '',
      avatar: '',
      roles: []
    }
  },

  actions: {
    M_username(username) {
      this.$patch((state) => {
        state.username = username
      })
    },
    M_roles(roles) {
      this.$patch((state) => {
        state.roles = roles
      })
    },

    login(data) {
      return new Promise((resolve, reject) => {
        loginReq(data)
          .then((res) => {
            if (res.code === 20000) {
              //commit('SET_Token', res.data?.jwtToken)
              setToken(res.data?.jwtToken)
              resolve(null)
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
    getInfo() {
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
            this.M_username(username)
            this.M_roles(roles)
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
            this.resetState()
            resolve(null)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    resetState() {
      return new Promise((resolve) => {
        this.M_username('')
        this.M_roles([])
        removeToken() // must remove  token  first
        resetRouter() // reset the router
        const permissionStore = usePermissionStore()
        permissionStore.M_isGetUserInfo(false)
        const tagsViewStore = useTagsViewStore()
        tagsViewStore.delAllViews()
        resolve(null)
      })
    }
  }
})
