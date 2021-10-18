<template>
  <el-dropdown trigger="click" type="primary" @command="handleSetSize">
    <div class="pl-1 pr-4">
      <svg-icon icon-class="language" class="nav-svg-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in sizeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="size === item.value"
        >
          <h3 class="pt-1 pb-1 font-sizePx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import Cookies from 'js-cookie'
import { computed, reactive, toRefs } from 'vue'
const state = reactive({
  sizeOptions: [
    { label: '中文', value: 'zhCn' },
    { label: 'English', value: 'en' }
  ]
})

const size = computed(() => {
  return Cookies.get('language')
})

const handleSetSize = (size) => {
  Cookies.set('language', size)
  location.reload()
}
//导出属性到页面中使用
let { sizeOptions } = toRefs(state)
</script>

<style scoped lang="scss"></style>
