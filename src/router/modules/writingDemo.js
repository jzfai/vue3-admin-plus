import Layout from '@/layout'

const writingDemoRouter = {
  path: '/writing-demo',
  component: Layout,
  meta: { title: 'Writing Demo', icon: 'eye-open' },
  alwaysShow: true,
  children: [
    {
      path: 'hook',
      component: () => import('@/views/example/hook/Hook.vue'),
      name: 'Hook',
      meta: { title: 'Hook-Demo' }
    },
    {
      path: 'vuex-use',
      component: () => import('@/views/example/vuex-use/VuexUse.vue'),
      name: 'VuexUse',
      meta: { title: 'Vuex-Demo' }
    },
    {
      path: 'mock-test',
      component: () => import('@/views/example/mock-test/MockTest.vue'),
      name: 'MockTest',
      meta: { title: 'Mock-Demo' }
    },
    {
      path: 'svg-icon',
      component: () => import('@/views/example/svg-icon/SvgIcon.vue'),
      name: 'SvgIcon',
      meta: { title: 'Svg-Demo' }
    },
    {
      path: 'parent-children',
      component: () => import('@/views/example/parent-children/Parent.vue'),
      name: 'Parent',
      meta: { title: 'Parent-Children' }
    },
    {
      path: 'keep-alive',
      component: () => import('@/views/example/keep-alive'),
      name: 'KeepAlive',
      //cachePage: cachePage when page enter, default false
      //leaveRmCachePage: remove cachePage when page leave, default false
      meta: { title: 'Keep-Alive', cachePage: true, leaveRmCachePage: false }
    },
    {
      path: 'tab-keep-alive',
      component: () => import('@/views/example/keep-alive/TabKeepAlive.vue'),
      name: 'TabKeepAlive',
      //closeTabRmCache: remove cachePage when tabs close, default false
      meta: { title: 'Tab-Keep-Alive', cachePage: true, closeTabRmCache: true }
    },
    {
      path: 'router-demo-f',
      name: 'routerDemoF',
      hidden: true,
      component: () => import('@/views/example/keep-alive/RouterDemoF.vue'),
      meta: { title: 'RouterDemo-F', cachePage: true, activeMenu: '/writing-demo/keep-alive' }
    },
    {
      path: 'router-demo-s',
      name: 'routerDemoS',
      hidden: true,
      component: () => import('@/views/example/keep-alive/RouterDemoS.vue'),
      meta: { title: 'RouterDemo-S', cachePage: true, activeMenu: '/writing-demo/keep-alive' }
    },
    {
      path: 'deep-router-keep-alive',
      name: 'DeepRouterKeepAlive',
      component: () => import('@/views/example/keep-alive/DeepRouterKeepAlive.vue'),
      //注：移除父容器页面缓存会把子页面一起移除了
      meta: { title: 'Deep KeepAlive', cachePage: true, leaveRmCachePage: false },
      alwaysShow: true,
      children: [
        {
          path: 'deep-children',
          name: 'DeepChildren',
          component: () => import('@/views/example/keep-alive/deep-children/DeepChildren.vue'),
          meta: { title: 'DeepChildren', cachePage: true, leaveRmCachePage: true }
        },
        {
          path: 'deep-children-sd',
          name: 'DeepChildrenSd',
          component: () => import('@/views/example/keep-alive/deep-children/DeepChildrenSd.vue'),
          meta: { title: 'DeepChildrenSd', cachePage: true, leaveRmCachePage: false }
        }
      ]
    },
    {
      path: 'table-with-pagination',
      component: () => import('@/views/table-with-pagination/index.vue'),
      name: 'TableWithPagination',
      meta: { title: 'Table With Pagination' }
    }
  ]
}

export default writingDemoRouter
