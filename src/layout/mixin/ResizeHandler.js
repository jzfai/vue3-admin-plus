/*用hook代替了*/
// import store from '@/store'
//
// const { body } = document
// const WIDTH = 992
// export default {
//   // watch: {
//   //   $route(route) {
//   //     if (this.device === 'mobile' && this.sidebar.opened) {
//   //       store.dispatch('app/closeSideBar', { withoutAnimation: false })
//   //     }
//   //   }
//   // },
//   beforeMount() {
//     window.addEventListener('resize', this.$_resizeHandler)
//   },
//   beforeDestroy() {
//     window.removeEventListener('resize', this.$_resizeHandler)
//   },
//   mounted() {
//     const isMobile = this.$_isMobile()
//     if (isMobile) {
//       store.commit('app/M_sidebar_opened', false)
//       // store.dispatch('app/toggleDevice', 'mobile')
//       // store.dispatch('app/closeSideBar', { withoutAnimation: true })
//     } else {
//       store.commit('app/M_sidebar_opened', true)
//     }
//   },
//   methods: {
//     // use $_ for mixins properties
//     // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
//     $_isMobile() {
//       const rect = body.getBoundingClientRect()
//       return rect.width - 1 < WIDTH
//     },
//     $_resizeHandler() {
//       if (!document.hidden) {
//         const isMobile = this.$_isMobile()
//         // console.log('toggleDevice')
//         // store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
//         if (isMobile) {
//           // console.log('closeSideBar')
//           // store.dispatch('app/closeSideBar', { withoutAnimation: true })
//
//           /*此处只做根据window尺寸关闭sideBar功能*/
//           store.commit('app/M_sidebar_opened', false)
//         } else {
//           store.commit('app/M_sidebar_opened', true)
//         }
//       }
//     }
//   }
// }
