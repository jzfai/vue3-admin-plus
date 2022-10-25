import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

/* Router Modules */
import chartsRouter from './modules/charts'
import useExample from './modules/useExample'
import writingDemo from './modules/writingDemo'

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
    component: () => import('@/views/login/Login.vue'),
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
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: 'Dashboard', elSvgIcon: 'Fold' }
      }
    ]
  },
  {
    path: '/low-code-platform',
    component: Layout,
    children: [
      {
        path: 'https://github.jzfai.top/low-code-platform',
        meta: { title: 'LowCodePlatform', icon: 'link' }
      }
    ]
  },
  {
    path: '/RBAC',
    component: Layout,
    children: [
      {
        path: 'https://github.jzfai.top/low-code-platform/#/permission-center/user-table-query',
        meta: { title: 'RBAC', icon: 'link' }
      }
    ]
  },
  {
    path: '/setting-switch',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/setting-switch'),
        name: 'SettingSwitch',
        meta: { title: 'Setting Switch', icon: 'example' }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index.vue'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide' }
      }
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    name: 'ErrorLog',
    redirect: '/error-log/list',
    meta: { title: 'ErrorLog', icon: 'bug' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/error-log'),
        name: 'ErrorLog',
        meta: { title: 'ErrorLog' }
      },
      {
        path: 'error-log-test',
        component: () => import('@/views/error-log/ErrorLogTest.vue'),
        name: 'ErrorLogTest',
        meta: { title: 'ErrorLog Test' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  chartsRouter,
  {
    path: '/excel',
    component: Layout,
    meta: { title: 'EXCEL', icon: 'excel' },
    alwaysShow: true,
    children: [
      {
        path: 'exportExcel',
        component: () => import('@/views/excel/exportExcel.vue'),
        name: 'exportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'importExcel',
        component: () => import('@/views/excel/importExcel.vue'),
        name: 'importExcel',
        meta: { title: 'importExcel' }
      }
    ]
  },
  {
    path: '/crud',
    component: Layout,
    meta: { title: 'CRUD', icon: 'guide' },
    alwaysShow: true,
    children: [
      {
        path: 'crud',
        component: () => import('@/views/crud'),
        name: 'crud',
        meta: { title: 'CRUD-Demo' }
      },
      {
        path: 'import-export',
        component: () => import('@/views/crud/Vci.vue'),
        name: 'ImportExport',
        meta: { title: 'Import Export' }
      },
      {
        path: 'img-address-packing',
        component: () => import('@/views/crud/ImgAddressPacking.vue'),
        name: 'ImgAddressPacking',
        meta: { title: 'ImgAdd Pack' }
      }
    ]
  },
  useExample,
  writingDemo,
  {
    path: '/directive',
    component: Layout,
    meta: { title: 'Directive', icon: 'education' },
    alwaysShow: true,
    children: [
      {
        path: 'copy',
        component: () => import('@/views/directive/copy.vue'),
        name: 'copy',
        meta: { title: 'v-copy' }
      },
      {
        path: 'debounce',
        component: () => import('@/views/directive/debounce.vue'),
        name: 'debounce',
        meta: { title: 'v-debounce' }
      },
      {
        path: 'longpress',
        component: () => import('@/views/directive/longpress.vue'),
        name: 'longpress',
        meta: { title: 'v-longpress' }
      },
      {
        path: 'watermark',
        component: () => import('@/views/directive/watermark.vue'),
        name: 'watermark',
        meta: { title: 'v-watermark' }
      },
      {
        path: 'waves',
        component: () => import('@/views/directive/waves.vue'),
        name: 'waves',
        meta: { title: 'v-waves' }
      },
      {
        path: 'clickoutside',
        component: () => import('@/views/directive/clickoutside.vue'),
        name: 'clickoutside',
        meta: { title: 'v-clickoutside' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['test', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'roleIndex',
        component: () => import('@/views/permission'),
        name: 'Permission',
        meta: {
          title: 'Role Index'
          //roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'code-index',
        component: () => import('@/views/permission/CodePermission.vue'),
        name: 'CodePermission',
        meta: {
          title: 'Code Index'
        }
      },
      {
        path: 'code-page',
        component: () => import('@/views/permission/CodePage.vue'),
        name: 'CodePage',
        meta: {
          title: 'Code Page',
          code: 1
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
