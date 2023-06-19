import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
/* Router Modules */
import charts from './modules/charts'
import guid from './modules/guid'
import excel from './modules/excel'
import directive from './modules/directive'
import table from './modules/table'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: 'Dashboard', elSvgIcon: 'Fold', affix: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'OSS', icon: 'example' },
    children: [
      {
        path: 'oss/index',
        component: () => import('@/views/system/oss/index.vue'),
        name: 'Oss',
        meta: { title: '列表', icon: 'Fold' }
      }
    ]
  }
  //
  // guid,
  // charts,
  // excel,
  // directive,
  // table

  // {
  //   path: '/system1',
  //   component: Layout,
  //   alwaysShow: true,
  //   meta: { title: '系统管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'platform/index',
  //       component: () => import('@/views/system/platform/index.vue'),
  //       name: 'platform',
  //       meta: { title: '平台管理', icon: 'Fold' }
  //     }
  //   ]
  // }
  // {
  //   path: '/setting-switch',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/setting-switch/index.vue'),
  //       name: 'SettingSwitch',
  //       meta: { title: 'Setting Switch', icon: 'example' }
  //     }
  //   ]
  // },
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   meta: { title: 'Error Log', icon: 'eye' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'error-log',
  //       component: () => import('@/views/error-log/index.vue'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Index' }
  //     },
  //     {
  //       path: 'error-generator',
  //       component: () => import('@/views/error-log/error-generator.vue'),
  //       name: 'ErrorGenerator',
  //       meta: { title: 'Error Generator' }
  //     }
  //   ]
  // }
  // basicDemo
]

//角色和code数组动态路由
export const roleCodeRoutes = [
  // {
  //   path: '/roles-codes',
  //   component: Layout,
  //   redirect: '/roles-codes/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/roles-codes/index.vue'),
  //       name: 'RolesCodes',
  //       meta: { title: 'Permission Switch' }
  //     },
  //     {
  //       path: 'roleIndex',
  //       component: () => import('@/views/roles-codes/role-index.vue'),
  //       name: 'RoleIndex',
  //       meta: { title: 'Role Index', roles: ['admin'] }
  //     },
  //     {
  //       path: 'code-index',
  //       component: () => import('@/views/roles-codes/code-index.vue'),
  //       name: 'CodeIndex',
  //       meta: { title: 'Code Index', code: 16 }
  //     },
  //     {
  //       path: 'button-permission',
  //       component: () => import('@/views/roles-codes/button-permission.vue'),
  //       name: 'ButtonPermission',
  //       meta: { title: 'Button Permission' }
  //     }
  //   ]
  // }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', name: 'CatchAll', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
