import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import router from './router'
import '@/styles/index.scss' // global css
//import vuex
import store from './store'
app.use(store)

//import element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, { size: 'mini', locale: zhCn })

//global mixin
import elementMixin from '@/mixins/elementMixin'
app.mixin(elementMixin)
import commonMixin from '@/mixins/commonMixin'
app.mixin(commonMixin)

//import axios req
import axiosReq from '@/utils/axiosReq'
app.config.globalProperties.$axiosReq = axiosReq

//svg-icon
//import svg-icon doc in  https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'
app.component('svg-icon', svgIcon)

//global mount moment-mini
import $momentMini from 'moment-mini'
app.config.globalProperties.$momentMini = $momentMini

//import global directive
import directive from '@/directive'
directive(app)

//import router  intercept
import './permission'

//error log  collection
import errorLog from '@/hooks/errorLogHook'
errorLog(app)

app.use(router).mount('#app')
