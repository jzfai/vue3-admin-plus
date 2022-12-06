import Layout from '@/layout/index.vue'
const table = {
  path: '/table',
  component: Layout,
  meta: { title: 'Table', icon: 'table' },
  alwaysShow: true,
  children: [
    {
      path: 'dynamic-table',
      name: 'DynamicTable',
      component: () => import('@/views/table/dynamic-table.vue'),
      meta: { title: 'Dynamic Table', icon: 'nested' }
    },
    {
      path: 'vxe-table',
      name: 'VxeTable',
      component: () => import('@/views/table/vxe-table.vue'),
      meta: { title: 'Vxe Table', icon: 'nested' }
    }
  ]
}

export default table
