import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'
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
    const filterRouter = []
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
    return roles.some((role) => route.meta?.roles?.includes(role))
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

export const usePermissionStore = defineStore('permission', {
  /***
   *类似于组件的 data数据的 ,用来存储全局状态的
   * 1、必须是箭头函数
   */
  state: () => {
    return {
      isGetUserInfo: false, // get userInfo
      routes: [], //将过滤后的异步路由和静态路由集合
      addRoutes: [] //过滤后的异步路由
    }
  },

  /***
   *封装处理数据的函数（业务逻辑)：修改数据
   */
  actions: {
    M_routes(routes) {
      this.$patch((state) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
      })
    },
    M_isGetUserInfo(data) {
      this.$patch((state) => {
        state.isGetUserInfo = data
      })
    },
    generateRoutes(roles) {
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
        // commit('M_routes', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})
