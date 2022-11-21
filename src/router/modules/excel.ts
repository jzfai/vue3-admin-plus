import Layout from '@/layout/index.vue'
const excel = {
  path: '/excel',
  component: Layout,
  meta: { title: 'Excel', icon: 'pdf' },
  alwaysShow: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/excel/index.vue'),
      name: 'Index',
      meta: { title: 'Index' }
    }
  ]
}

export default excel
