import Layout from '@/layout/index.vue'
const guid = {
  path: '/guide',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/guide/index.vue'),
      name: 'Guide',
      meta: { title: 'Guide', icon: 'guide' }
    }
  ]
}
export default guid
