import Layout from '@/layout/index.vue'
const BasicDemo = {
  path: '/basic-demo',
  component: Layout,
  meta: { title: 'Basic Demo', icon: 'eye-open' },
  alwaysShow: true,
  children: [
    {
      path: 'hook',
      component: () => import('@/views/basic-demo/hook/index.vue'),
      name: 'Hook',
      meta: { title: 'Hook' }
    },
    {
      path: 'pinia',
      component: () => import('@/views/basic-demo/pinia/index.vue'),
      name: 'Pinia',
      meta: { title: 'Pinia' }
    },
    {
      path: 'mock',
      component: () => import('@/views/basic-demo/mock/index.vue'),
      name: 'Mock',
      meta: { title: 'Mock' }
    },
    {
      path: 'svg-icon',
      component: () => import('@/views/basic-demo/svg-icon/index.vue'),
      name: 'SvgIcon',
      meta: { title: 'Svg Icon' }
    },
    {
      path: 'parent-children',
      component: () => import('@/views/basic-demo/parent-children/index.vue'),
      name: 'Parent',
      meta: { title: 'Parent Children' }
    },
    {
      path: 'second-keep-alive',
      component: () => import('@/views/basic-demo/keep-alive/index.vue'),
      name: 'SecondKeepAlive',
      //cachePage: cachePage when page enter, default false
      //leaveRmCachePage: remove cachePage when page leave, default false
      meta: { title: 'Second KeepAlive', cachePage: true, leaveRmCachePage: false }
    },
    {
      path: 'second-child',
      name: 'SecondChild',
      hidden: true,
      component: () => import('@/views/basic-demo/keep-alive/second-child.vue'),
      meta: { title: 'SecondChild', cachePage: true, activeMenu: '/basic-demo/second-keep-alive' }
    },
    {
      path: 'third-child',
      name: 'ThirdChild',
      hidden: true,
      component: () => import('@/views/basic-demo/keep-alive/third-child.vue'),
      meta: { title: 'ThirdChild', cachePage: true, activeMenu: '/basic-demo/second-keep-alive' }
    },
    //tab-keep-alive
    {
      path: 'tab-keep-alive',
      component: () => import('@/views/basic-demo/keep-alive/tab-keep-alive.vue'),
      name: 'TabKeepAlive',
      //closeTabRmCache: remove cachePage when tabs close, default false
      meta: { title: 'Tab KeepAlive', cachePage: true, closeTabRmCache: true }
    },
    //third-keep-alive
    {
      path: 'third-keep-alive',
      name: 'ThirdKeepAlive',
      component: () => import('@/views/basic-demo/keep-alive/third-keep-alive.vue'),
      //注：移除父容器页面缓存会把子页面一起移除了
      meta: { title: 'Third KeepAlive', cachePage: true, leaveRmCachePage: false },
      alwaysShow: true,
      children: [
        {
          path: 'second-children',
          name: 'SecondChildren',
          component: () => import('@/views/basic-demo/keep-alive/third-children/SecondChildren.vue'),
          meta: { title: 'SecondChild', cachePage: true, leaveRmCachePage: true }
        },
        {
          path: 'third-children',
          name: 'ThirdChildren',
          component: () => import('@/views/basic-demo/keep-alive/third-children/ThirdChildren.vue'),
          meta: { title: 'ThirdChild', cachePage: true, leaveRmCachePage: false }
        }
      ]
    },
    {
      path: 'worker',
      component: () => import('@/views/basic-demo/worker/index.vue'),
      name: 'Worker',
      meta: { title: 'Worker' }
    }
  ]
}

export default BasicDemo
