/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard.vue'),
      name: 'KeyboardChart',
      meta: { title: 'Keyboard Chart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line.vue'),
      name: 'LineChart',
      meta: { title: 'Line Chart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart.vue'),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true }
    },
    {
      path: 'echarts-demo',
      component: () => import('@/views/charts/echarts-demo.vue'),
      name: 'EchartsDemo',
      meta: { title: 'Echarts Demo', noCache: true }
    }
  ]
}

export default chartsRouter
