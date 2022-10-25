import router, { asyncRoutes } from '@/router'
import settings from './settings'
import { getToken, setToken } from '@/utils/auth'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'

const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  if (settings.isNeedNprogress) NProgress.start()
  // set page title
  // document.title = getPageTitle(to.meta.title)
  if (!settings.isNeedLogin) setToken(settings.tmpToken)
  const hasToken = getToken()

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      //judge isGetUserInfo
      const isGetUserInfo = permissionStore.isGetUserInfo
      if (isGetUserInfo) {
        next()
      } else {
        try {
          let accessRoutes = []
          if (settings.isNeedLogin) {
            // get user info
            const { menuList, roles, codes } = await userStore.getUserInfo()
            //filter Router
            accessRoutes = await permissionStore.generateRoutes(menuList, roles, codes)
          } else {
            accessRoutes = asyncRoutes
          }
          // setting constRouters and accessRoutes to vuex , in order to sideBar for using
          permissionStore.setRoutes(accessRoutes)
          console.log('accessRoutes', accessRoutes)
          // dynamically add accessible routes
          //router4 addRoutes destroyed
          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })
          //already get userInfo
          permissionStore.setGetUserInfo(true)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          console.error(err)
          await userStore.resetState()
          next(`/login?redirect=${to.path}`)
          if (settings.isNeedNprogress) NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      if (settings.isNeedNprogress) NProgress.done()
    }
  }
})

router.afterEach(() => {
  if (settings.isNeedNprogress) NProgress.done()
})
