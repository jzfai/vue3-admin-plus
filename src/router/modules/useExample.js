import Layout from '@/layout'

const useExampleRouter = {
  path: '/use-example',
  component: Layout,
  meta: { title: 'Use Example', icon: 'documentation' },
  alwaysShow: true,
  children: [
    {
      path: 'i18n-demo',
      component: () => import('@/views/use-example/i18n/I18n-Demo.vue'),
      name: 'I18nDemo',
      meta: { title: 'I18n-Demo', icon: 'documentation' }
    },
    {
      path: 'd3',
      component: () => import('@/views/use-example/d3/D3.vue'),
      name: 'D3',
      meta: { title: 'd3-force', icon: 'documentation' }
    },
    {
      path: 'signboard',
      component: () => import('@/views/use-example/signboard/SignBoard.vue'),
      name: 'SignBoard-demo',
      meta: { title: 'signboard', icon: 'documentation' }
    },
    {
      path: 'dragpane-demo',
      name: 'dragpaneDemo',
      component: () => import('@/views/use-example/dragPane/dragPane.vue'),
      meta: { title: 'dragPane', icon: 'documentation' }
    },
    {
      path: 'worker-Demo',
      name: 'WorkerDemo',
      component: () => import('@/views/use-example/worker'),
      meta: { title: 'Worker Demo', icon: 'nested' }
    },
    {
      path: 'count-To',
      name: 'count-To',
      component: () => import('@/views/use-example/countTo/countTo.vue'),
      meta: { title: 'countTo', icon: 'nested' }
    },
    {
      path: 'tinymce-example',
      name: 'tinymce-example',
      component: () => import('@/views/use-example/tinymce-example/TinymceExample.vue'),
      meta: { title: 'Tinymce', icon: 'nested' }
    },
    {
      path: 'vxe-table',
      name: 'vxe-table',
      component: () => import('@/views/use-example/vxeTable/vxeTable.vue'),
      meta: { title: 'vxe-table', icon: 'nested' }
    },
  ]
}

export default useExampleRouter
