import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import router from './router'
import '@/styles/index.scss' // global css

//import element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import settings from '@/settings'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en' // element-ui lang
let lang = { zh, en }
app.use(ElementPlus, {
  size: localStorage.getItem('size') || settings.defaultSize,
  locale: lang[localStorage.getItem('language') || settings.defaultLanguage]
})
//i18n
import i18n from '@/lang'
app.use(i18n)

//global mixin
// import elementMixin from '@/mixins/elementMixin'
// app.mixin(elementMixin)
// import commonMixin from '@/mixins/commonMixin'
// app.mixin(commonMixin)
// import routerMixin from '@/mixins/routerMixin'
// app.mixin(routerMixin)
//import axios req
// import axiosReq from '@/utils/axiosReq'
// app.config.globalProperties.$axiosReq = axiosReq

//svg-icon
//import svg-icon doc in  https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'
app.component('SvgIcon', svgIcon)

//element svg icon
import ElSvgIcon from '@/components/ElSvgIcon.vue'
app.component('ElSvgIcon', ElSvgIcon)

//global mount moment-mini
// import $momentMini from 'moment-mini'
// app.config.globalProperties.$momentMini = $momentMini

//import global directive
import directive from '@/directive'
directive(app)

//import global directive
import components from '@/components'
components(app)

//import router  intercept
import './permission'

//error log  collection
import errorLog from '@/hooks/useErrorLog'
errorLog(app)

//axios cancel req
window.__axiosPromiseArr = []

//pinia
import { createPinia } from 'pinia'
app.use(createPinia())

app.use(router).mount('#app')
