import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'
const { body } = document
const WIDTH = 992
export default function () {
  const $_isMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      // console.log('toggleDevice')
      // store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        // console.log('closeSideBar')
        // store.dispatch('app/closeSideBar', { withoutAnimation: true })
        /*此处只做根据window尺寸关闭sideBar功能*/
        store.commit('app/M_sidebar_opened', false)
      } else {
        store.commit('app/M_sidebar_opened', true)
      }
    }
  }
  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })
  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      store.commit('app/M_sidebar_opened', false)
      // store.dispatch('app/toggleDevice', 'mobile')
      // store.dispatch('app/closeSideBar', { withoutAnimation: true })
    } else {
      store.commit('app/M_sidebar_opened', true)
    }
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })
}
