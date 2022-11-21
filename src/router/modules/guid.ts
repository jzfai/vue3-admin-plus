import Layout from '@/layout/index.vue'
const guid = {
  path: '/guid',
  component: Layout,
  meta: { title: 'Guid', icon: 'theme' },
  alwaysShow: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/guid/index.vue'),
      name: 'Index',
      meta: { title: 'Index' }
    }
  ]
}

export default guid
