import Layout from '@/layout/index.vue'
const excel = {
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
}

export default excel
