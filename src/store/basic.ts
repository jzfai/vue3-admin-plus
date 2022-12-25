import { nextTick } from 'vue'
import { defineStore } from 'pinia'
import type { RouterTypes } from '~/basic'
import defaultSettings from '@/settings'
import router, { constantRoutes } from '@/router'
export const useBasicStore = defineStore('basic', {
  state: () => {
    return {
      token: '',
      getUserInfo: false,
      userInfo: { username: '', avatar: '' }, //user info
      //router
      allRoutes: [] as RouterTypes,
      buttonCodes: [],
      filterAsyncRoutes: [],
      roles: [] as Array<string>,
      codes: [] as Array<number>,
      //keep-alive
      cachedViews: [] as Array<string>,
      cachedViewsDeep: [] as Array<string>,
      //other
      sidebar: { opened: true },
      //axios req collection
      axiosPromiseArr: [] as Array<ObjKeys>,
      settings: defaultSettings
    }
  },
  persist: {
    storage: localStorage,
    paths: ['token']
  },
  actions: {
    setToken(data) {
      this.token = data
    },
    setFilterAsyncRoutes(routes) {
      this.$patch((state) => {
        state.filterAsyncRoutes = routes
        state.allRoutes = constantRoutes.concat(routes)
      })
    },
    setUserInfo({ userInfo, roles, codes }) {
      const { username, avatar } = userInfo
      this.$patch((state) => {
        state.roles = roles
        state.codes = codes
        state.getUserInfo = true
        state.userInfo.username = username
        state.userInfo.avatar = avatar
      })
    },
    resetState() {
      this.$patch((state) => {
        state.token = '' //reset token
        state.roles = []
        state.codes = []
        //reset router
        state.allRoutes = []
        state.buttonCodes = []
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
