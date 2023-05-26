import NProgress from 'nprogress'
/**
 * 根据请求，过滤异步路由
 * @param:menuList 异步路由数组
 * return 过滤后的异步路由
 */
// @ts-ignore
import Layout from '@/layout/index.vue'
/*
 * 路由操作
 * */
import router, { asyncRoutes, constantRoutes, roleCodeRoutes } from '@/router'
//进度条
import 'nprogress/nprogress.css'
import { useBasicStore } from '@/store/basic'

//过滤异步路由
export function filterAsyncRouter(data) {
  const basicStore = useBasicStore()
  const fileAfterRouter = filterAsyncRouterByReq(data)
  fileAfterRouter.forEach((route) => router.addRoute(route))
  basicStore.setFilterAsyncRoutes(fileAfterRouter)
}

import ParentView from '@/components/ParentView/index.vue'
import InnerLink from '@/components/InnerLink/index.vue'
// @ts-ignore
const modules = import.meta.glob('../views/**/**.vue')
export const filterAsyncRouterByReq = (asyncRouterMap) => {
  return asyncRouterMap.filter((route) => {
    // if (type && route.children) {
    //   route.children = filterChildren(route.children)
    // }
    //console.log(route)
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = modules[`../views/${route.component}`]
      }
    }
    if (route.children?.length) {
      route.children = filterAsyncRouterByReq(route.children)
    } else {
      delete route['children']
      delete route['redirect']
    }
    if (route.routeName) {
      route.name = route.routeName
    }
    if (route.metaExtra && JSON.parse(route.metaExtra) !== '{}') {
      route.meta = Object.assign(route.meta, JSON.parse(JSON.parse(route.metaExtra)))
    }
    return true
  })
}
// const filterChildren = (childrenMap, lastRouter = false) => {
//   let children: any = []
//   childrenMap.forEach((el) => {
//     if (el.children?.length) {
//       if (el.component === 'ParentView' && !lastRouter) {
//         el.children.forEach((c) => {
//           c.path = `${el.path}/${c.path}`
//           if (c.children && c.children.length) {
//             children = children.concat(filterChildren(c.children, c))
//             return
//           }
//           children.push(c)
//         })
//         return
//       }
//     }
//     if (lastRouter) {
//       // @ts-ignore
//       el.path = `${lastRouter.path}/${el.path}`
//     }
//     children = children.concat(el)
//   })
//   return children
// }

//重置路由
export function resetRouter() {
  //移除之前存在的路由
  const routeNameSet = new Set()
  router.getRoutes().forEach((fItem) => {
    if (fItem.name) routeNameSet.add(fItem.name)
  })
  // @ts-ignore
  routeNameSet.forEach((setItem) => router.removeRoute(setItem))
  //新增constantRoutes
  constantRoutes.forEach((feItem) => router.addRoute(feItem))
}

//重置登录状态
export function resetState() {
  resetRouter()
  useBasicStore().resetState()
}

//刷新路由
export function freshRouter(data) {
  resetRouter()
  filterAsyncRouter(data)
  // location.reload()
}

NProgress.configure({ showSpinner: false })
//开始进度条
export const progressStart = () => {
  NProgress.start()
}
//关闭进度条
export const progressClose = () => {
  NProgress.done()
}
