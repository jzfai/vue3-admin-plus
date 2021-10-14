import router, { asyncRoutes } from '@/router'
import store from './store'
import settings from './settings'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  if (settings.isNeedNprogress) NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  /*
   * 总的来说：过滤动态路由
   * 1.是否与token 没有去登录页 ,有 如果要去登录页则重定向到首页。没有, 重新定向到登录页
   * 2.判断是否权限筛选,是,直接放行。没有，筛选动态路由后，添加动态路由然后放行，
   * */
  let hasToken = settings.isNeedLogin ? getToken() : 'temp_token'
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      //是否获取过用户信息
      let isGetUserInfo = store.state.permission.isGetUserInfo
      if (isGetUserInfo) {
        next()
      } else {
        try {
          let accessRoutes = []
          if (settings.isNeedLogin) {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const { roles } = await store.dispatch('user/getInfo')
            accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          } else {
            accessRoutes = asyncRoutes
            store.commit('permission/M_routes', accessRoutes)
          }
          // dynamically add accessible routes
          //router4 addRoutes destroyed
          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })
          //already get userInfo
          store.commit('permission/M_isGetUserInfo', true)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          await store.dispatch('user/resetToken')
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
