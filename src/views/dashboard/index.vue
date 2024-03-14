<template>
  <div>
    <div v-lang class="mt-10px mb-10px text-green-500 text-18px">本框架完全用 setup-script 语法书写</div>
    <div class="mt-20px">vue3全家桶技术</div>
    <div class="mt-10px">基础构建： vue3+vite4</div>
    <div class="mt-10px">ui库： element-plus</div>
    <div class="mt-10px">路由： vue-router4</div>
    <div class="mt-10px">状态管理： pinia(vuex5)</div>
    <div class="mt-10px">相关插件： unoscc, vite-plugin-mkcert, unplugin-auto-import,unplugin-vue-define-options 等</div>
    <div v-lang class="mt-10px mb-10px font-bold">实现功能</div>
    <div class="mt-10px">rbac路由权限控制，keep-alive缓存，主题色，国际化语言，layout布局，size切换;</div>
    <div class="mt-10px">vue3,hook,mock等基础使用例子</div>

    <div class="mt-50px">
      <div v-lang class="mt-10px mb-10px font-bold">后端部分</div>
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
import {useRoute} from 'vue-router'
import {useConfigStore} from '@/store/config'

const {setTheme, theme, setSize, size, setLanguage} = useConfigStore()
const route = useRoute()


const newArray = [{
  name: "aaa",
  value: 0
},
  {
    name: "ddd",
    value: 3
  },
  {
    name: "bbb",
    value: 1
  },
  {
    name: "eee",
    value: 4
  },
  {
    name: "ccc",
    value: 2
  }];


function compare(property) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    return value1 - value2;
  }
}
console.log(newArray.sort(compare("value")))
</script>
