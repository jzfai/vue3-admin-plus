import Layout from '@/layout/index.vue'
const other = {
  path: '/other',
  component: Layout,
  meta: { title: 'Other', icon: 'eye-open' },
  alwaysShow: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/other/index.vue'),
      name: 'Index',
      meta: { title: 'Index' }
    }
  ]
}

export default other
