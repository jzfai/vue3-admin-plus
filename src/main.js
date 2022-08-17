import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import router from './router'

import '@/styles/index.scss' // global css

//import element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

//i18n
import { setupI18n } from '@/lang'
app.use(setupI18n)

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
// import ElSvgIcon from '@/components/ElSvgIcon.vue'
// app.component('ElSvgIcon', ElSvgIcon)

//global mount moment-mini
// import $momentMini from 'moment-mini'
// app.config.globalProperties.$momentMini = $momentMini

//import global directive
import directive from '@/directives'
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

//import theme
import './theme/index.scss'
//import unocss
import 'uno.css'

//import vxe-table
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
app.use(VXETable)

app.use(router).mount('#app')
