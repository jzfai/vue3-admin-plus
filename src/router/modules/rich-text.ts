import Layout from '@/layout/index.vue'
const richText = {
  path: '/rich-text',
  component: Layout,
  meta: { title: 'Rich Text', icon: 'clipboard' },
  alwaysShow: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/rich-text/index.vue'),
      name: 'Index',
      meta: { title: 'Index' }
    }
  ]
}

export default richText
