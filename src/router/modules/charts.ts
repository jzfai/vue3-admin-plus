import Layout from '@/layout/index.vue'
const charts = {
  path: '/charts',
  component: Layout,
  meta: { title: 'Charts', icon: 'clipboard' },
  alwaysShow: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/charts/index.vue'),
      name: 'Index',
      meta: { title: 'Index' }
    }
  ]
}

export default charts
