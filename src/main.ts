import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import router from './router'
import '@/styles/index.scss' // global css

//svg-icon
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'

//import global directive（unplugin-vue-components auto scan）
import directive from '@/directives'

//import router intercept
import './permission'

//import theme
import './theme/index.scss'
//import unocss
import 'uno.css'

//i18n
import { setupI18n } from '@/lang'
app.use(setupI18n)

//import element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

//按需导入
// import ElementPlus from '@/lib/element-plus'
// ElementPlus(app)
app.component('SvgIcon', svgIcon)

directive(app)

//piniaPluginPersistedstate
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router).mount('#app')
