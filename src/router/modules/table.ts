import Layout from '@/layout/index.vue'
const table = {
  path: '/table',
  component: Layout,
  meta: { title: 'Table', icon: 'table' },
  alwaysShow: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/table/index.vue'),
      name: 'Index',
      meta: { title: 'Index' }
    }
  ]
}

export default table
