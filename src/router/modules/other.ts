import Layout from '@/layout/index.vue'
const other = {
  path: '/other',
  component: Layout,
  meta: { title: 'Other', icon: 'eye-open' },
  alwaysShow: true,
  children: [
    {
      path: 'count-to',
      component: () => import('@/views/other/count-to.vue'),
      name: 'CountTo',
      meta: { title: 'CountTo' }
    },
    {
      path: 'd3',
      component: () => import('@/views/other/d3/index.vue'),
      name: 'd3',
      meta: { title: 'd3' }
    },
    {
      path: 'drag-pane',
      component: () => import('@/views/other/drag-pane.vue'),
      name: 'DragPane',
      meta: { title: 'DragPane' }
    },
    {
      path: 'signboard',
      component: () => import('@/views/other/signboard/index.vue'),
      name: 'signboard',
      meta: { title: 'signboard' }
    }
  ]
}

export default other
