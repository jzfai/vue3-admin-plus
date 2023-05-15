import { nextTick } from 'vue'
import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import router, { constantRoutes } from '@/router'
export const useBasicStore = defineStore('basic', {
  state: () => {
    return {
      //user info
      token: '',
      getUserInfo: false,
      userInfo: { username: '', avatar: '' },
      //router
      allRoutes: [],
      filterAsyncRoutes: [],
      roles: [],
      permission: [] as Array<string>,
      //keep-alive
      cachedViews: [] as Array<string>,
      cachedViewsDeep: [] as Array<string>,
      //other
      sidebar: { opened: true },
      //axios req collection
      axiosPromiseArr: [],
      settings: defaultSettings
    }
  },
  persist: {
    storage: localStorage,
    paths: ['token']
  },
  actions: {
    remotePromiseArrByReqUrl(reqUrl) {
      this.$patch((state) => {
        state.axiosPromiseArr.forEach((fItem: any, index) => {
          if (fItem.url === reqUrl) {
            state.axiosPromiseArr.splice(index, 1)
          }
        })
      })
    },
    setToken(data) {
      this.token = data
    },
    setFilterAsyncRoutes(routes) {
      this.$patch((state: any) => {
        state.filterAsyncRoutes = routes
        state.allRoutes = constantRoutes.concat(routes)
      })
    },
    setUserInfo({ user, roles, permission }) {
      this.$patch((state) => {
        state.roles = roles
        state.permission = permission
        state.getUserInfo = true
        state.userInfo.username = user.username
        state.userInfo.avatar = user.avatar
      })
    },
    resetState() {
      this.$patch((state) => {
        state.token = '' //reset token
        state.roles = []
        state.permission = []
        //reset router
        state.allRoutes = []
        state.filterAsyncRoutes = []
        //reset userInfo
        state.userInfo.username = ''
        state.userInfo.avatar = ''
      })
      this.getUserInfo = false
    },
    resetStateAndToLogin() {
      this.resetState()
      nextTick(() => {
        router.push({ path: '/login' })
      })
    },
    setSidebarOpen(data) {
      this.$patch((state) => {
        state.sidebar.opened = data
      })
    },
    setToggleSideBar() {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened
      })
    },

    /*keepAlive缓存*/
    addCachedView(view) {
      this.$patch((state) => {
        if (state.cachedViews.includes(view)) return
        state.cachedViews.push(view)
      })
    },

    delCachedView(view) {
      this.$patch((state) => {
        const index = state.cachedViews.indexOf(view)
        index > -1 && state.cachedViews.splice(index, 1)
      })
    },
    /*third  keepAlive*/
    addCachedViewDeep(view) {
      this.$patch((state) => {
        if (state.cachedViewsDeep.includes(view)) return
        state.cachedViewsDeep.push(view)
      })
    },
    delCacheViewDeep(view) {
      this.$patch((state) => {
        const index = state.cachedViewsDeep.indexOf(view)
        index > -1 && state.cachedViewsDeep.splice(index, 1)
      })
    }
  }
})
