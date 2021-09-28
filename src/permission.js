import router, { asyncRoutes } from '@/router'
import store from './store'
import settings from './settings'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress' // progress bar
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle' // progress bar style

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  if (settings.isNeedNprogress) NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  /*
   * 正常流程如下:主要有两大点token和role
   * 1.是否与token 没有去登录页 ,有 如果要去登录页则重定向到首页。没有, 重新定向到登录页
   * 2.判断是否权限筛选,是,直接放行。没有，筛选动态路由后，添加动态路由然后放行，
   * */
  let token = ''
  if (settings.isNeedLogin) {
    token = getToken()
  } else {
    token = 'temp_token'
  }
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      let isPermission = store.state.permission.isSettingPermission
      // let isPermission = true
      if (isPermission) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          //过滤权限
          //let permissionCodeArr = await reqPermission()
          //let asyncRoutesAf = await filterPermissionFunc(permissionCodeArr, asyncRoutes)
          //保存过滤后的路由到vuex中供菜单使用
          store.commit('permission/M_routes', asyncRoutes)
          store.commit('permission/M_isSettingPermission', true)
          //...to 路由加载完后再放行,防止白屏
          //replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。=
          //vue3.0中addRoutes被销毁了
          asyncRoutes.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (err) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
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

//权限过滤方法
// function filterPermissionFunc(permissionCodeArr, asyncRoutes) {
//   return new Promise((resolve) => {
//     let filterRouter = []
//     asyncRoutes.forEach(async (routeItem) => {
//       if (permissionCodeArr.includes(routeItem.code) || routeItem.hidden) {
//         //判断children
//         if (routeItem.children) {
//           routeItem.children = await filterPermissionFunc(permissionCodeArr, routeItem.children)
//         }
//         filterRouter.push(routeItem)
//       }
//     })
//     resolve(filterRouter)
//   })
// }

//此处模拟请求权限数据
// function reqPermission() {
//   return new Promise((resolve) => {
//     resolve([1, 2, 3, 4, 5])
//   })
// }
//此处模拟登录后获取到的token
// function loginAfterToken() {
//   return new Promise((resolve) => {
//     resolve(localStorage.getItem('jwtToken'))
//   })
// }

router.afterEach(() => {
  // next();
  // console.log("路由后拦截afterEach");
  if (settings.isNeedNprogress) NProgress.done()
})
