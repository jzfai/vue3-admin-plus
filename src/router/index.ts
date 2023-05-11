import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

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
  }

  // {
  //   path: '/system',
  //   component: Layout,
  //   alwaysShow: true,
  //   meta: { title: '系统管理', icon: 'example' },
  //   children: [
  //     // {
  //     //   path: 'dict-data/index',
  //     //   component: () => import('@/views/system/dict-data/index.vue'),
  //     //   name: 'DictDataList',
  //     //   meta: { title: '数据字典', icon: 'Fold' }
  //     // }
  //     // {
  //     //   path: 'user/index',
  //     //   component: () => import('@/views/system/user/index.vue'),
  //     //   name: 'User',
  //     //   meta: { title: '用户管理', icon: 'Fold' }
  //     // },
  //     // {
  //     //   path: 'user-auth/role/:userId(\\d+)',
  //     //   component: () => import('@/views/system/user/auth-role.vue'),
  //     //   hidden: true,
  //     //   name: 'AuthRole',
  //     //   meta: { title: '分配角色', activeMenu: '/system/user/index' }
  //     // },
  //     // {
  //     //   path: 'role/index',
  //     //   component: () => import('@/views/system/role/index.vue'),
  //     //   name: 'Role',
  //     //   meta: { title: '角色管理', icon: 'Fold' }
  //     // },
  //     // {
  //     //   path: 'role-auth/user/:roleId(\\d+)',
  //     //   component: () => import('@/views/system/role/auth-user.vue'),
  //     //   hidden: true,
  //     //   name: 'AuthUser',
  //     //   meta: { title: '分配用户', activeMenu: '/system/role/index' }
  //     // },
  //     // {
  //     //   path: 'menu/index',
  //     //   component: () => import('@/views/system/menu/index.vue'),
  //     //   name: 'Menu',
  //     //   meta: { title: '菜单管理', icon: 'Fold' }
  //     // }
  //     // {
  //     //   path: 'dict/index',
  //     //   component: () => import('@/views/system/dict/index.vue'),
  //     //   name: 'Dict',
  //     //   meta: { title: '字典管理', icon: 'Fold' }
  //     // }
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
