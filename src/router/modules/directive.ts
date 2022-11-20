import Layout from '@/layout/index.vue'

const directive = {
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

export default directive
