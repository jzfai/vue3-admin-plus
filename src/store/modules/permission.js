import { constantRoutes, asyncRoutes } from '@/router'
import settings from '@/settings'

/**
 * Use meta.code to determine if the current user has permission
 * @param codeArr
 * @param routeItem
 */
function hasCodePermission(codeArr, routeItem) {
  if (routeItem.meta && routeItem.meta.code) {
    return codeArr.includes(routeItem.meta.code) || routeItem.hidden
  } else {
    return true
  }
}
/**
 * Use meta.code to determine if the current user has permission
 * @param codeArr
 * @param asyncRoutes
 */
function filterRouterByCodeArr(codeArr, asyncRoutes) {
  return new Promise((resolve) => {
    let filterRouter = []
    asyncRoutes.forEach(async (routeItem) => {
      if (hasCodePermission(codeArr, routeItem)) {
        if (routeItem.children) {
          routeItem.children = await filterRouterByCodeArr(codeArr, routeItem.children)
        }
        filterRouter.push(routeItem)
      }
    })
    resolve(filterRouter)
  })
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  isGetUserInfo: false, // get userInfo
  routes: [], //将过滤后的异步路由和静态路由集合
  addRoutes: [] //过滤后的异步路由
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(async (resolve) => {
      let accessedRoutes
      if (settings.permissionMode === 'roles') {
        //filter by role
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
      } else {
        //filter by codeArr
        //req code arr
        let codeArr = localStorage.getItem('codeArr')
        if (codeArr) {
          codeArr = JSON.parse(codeArr)
        } else {
          localStorage.setItem('codeArr', JSON.stringify([1]))
          codeArr = localStorage.getItem('codeArr')
        }
        accessedRoutes = await filterRouterByCodeArr(codeArr, asyncRoutes)
      }
      resolve(accessedRoutes)
    })
  }
}

const mutations = {
  M_routes: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  M_isGetUserInfo: (state, data) => {
    state.isGetUserInfo = data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
