import router from '@/router'
import { filterAsyncRouter, progressClose, progressStart } from '@/hooks/use-permission'
import { useBasicStore } from '@/store/basic'
import { getRouterReq, userInfoReq } from '@/api/user'
import { langTitle } from '@/hooks/use-common'
import settings from './settings'

//路由进入前拦截
//to:将要进入的页面 vue-router4.0 不推荐使用next()
const whiteList = ['/login', '/register', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to) => {
  progressStart()
  document.title = langTitle(to.meta?.title) // i18 page title
  const basicStore = useBasicStore()

  //not login
  if (!settings.isNeedLogin) {
    basicStore.setFilterAsyncRoutes([])
    return true
  }
  //1.判断token
  if (basicStore.token) {
    if (to.path === '/login') {
      return '/'
    } else {
      //2.判断是否获取用户信息
      if (!basicStore.getUserInfo) {
        try {
          //3.用户信息
          const userInfo = await userInfoReq()
          //4.保存用户信息到store
          // @ts-ignore
          basicStore.setUserInfo(userInfo)
          //4.路由设置
          const routeInfo = await getRouterReq()
          filterAsyncRouter(routeInfo)

          //5.再次执行路由跳转
          return { ...to, replace: true }
        } catch (e) {
          console.error(`route permission error${e}`)
          basicStore.resetState()
          progressClose()
          return `/login?redirect=${to.path}`
        }
      } else {
        return true
      }
    }
  } else {
    if (!whiteList.includes(to.path)) {
      return `/login?redirect=${to.path}`
    } else {
      return true
    }
  }
})
//路由进入后拦截
router.afterEach(() => {
  progressClose()
})
