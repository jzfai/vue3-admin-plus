<template>
  <div class="scroll-y">
    <h2>vue3-admin-plus 新一代的前端框架(完全使用vue3语法书写)</h2>
    <h3 class="mt-20px">vue3全家桶技术</h3>
    <div class="mt-10px">基础构建： vue3+vite3</div>
    <div class="mt-10px">ui库： element-plus</div>
    <div class="mt-10px">路由： vue-router4</div>
    <div class="mt-10px">状态管理： pinia(vuex5)</div>
    <div class="mt-10px">
      相关插件： unoscc, vite-plugin-mkcert, unplugin-auto-import,unplugin-vue-define-options 等
    </div>

    <h3 class="mt-20px">实现功能</h3>
    <div class="mt-10px">rbac路由权限控制，keep-alive缓存，主题色，国际化语言，layout布局，size切换;</div>
    <div class="mt-10px">vue3,hook,mock等基础使用例子</div>

    <div class="mt-50px">
      <h2>后端部分</h2>
      <div class="mt-10px mb-10px">
        <a class="btn-click-style font-bold" href="https://github.com/jzfai/micro-service-single.git">
          micro-service-single
        </a>
      </div>
      rewrite by Ruoyi-Vue-Plus, Thanks to(
      <a href="https://gitee.com/dromara/RuoYi-Vue-Plus" class="btn-click-style font-bold">Ruoyi-Vue-Plus</a>
      )

      <div class="mt-20px">接口文档</div>
      <div>
        <a class="btn-click-style font-bold" href="https://github.jzfai.top/micro-service-api/doc.html">api-doc</a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '@/store/config'

const { setTheme, theme, setSize, size, setLanguage } = useConfigStore()
const route = useRoute()
const changeLanguage = (langParam) => {
  setLanguage(langParam, route.meta?.title)
}
const count = ref(0)
const showObj = ref(GLOBAL_VAR)
</script>
