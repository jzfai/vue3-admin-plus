import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
//引入路由
import router from './router'
//引入样式
import '@/styles/index.scss' // global css
//引入vuex
import store from './store'
app.use(store)

//import element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, { size: 'mini', locale: zhCn })

//global mixin
import globalMixin from '@/mixins/globalMixin'
app.mixin(globalMixin)

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

//引入路由拦截器
import './permission'

app.use(router).mount('#app')
