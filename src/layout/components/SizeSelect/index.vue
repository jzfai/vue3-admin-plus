<template>
  <el-dropdown id="size-select" trigger="click" type="primary" @command="handleSetSize">
    <div class="pl-6px pr-6px">
      <svg-icon icon-class="size" class="nav-svg-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in sizeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="appStore.size === item.value"
        >
          <h3 class="pt-10px pb-10px font-sizePx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
const state = reactive({
  sizeOptions: [
    { label: 'Large ', value: 'large' },
    { label: 'Default ', value: 'default' },
    { label: 'Small', value: 'small' }
  ]
})

// const size = computed(() => {
//   return localStorage.getItem('size') || setting.defaultSize
// })

import { useAppStore } from '@/store/app'
const appStore = useAppStore()
const handleSetSize = (size) => {
  localStorage.setItem('size', size)
  appStore.size = size
  // location.reload()
}
//导出属性到页面中使用
let { sizeOptions } = toRefs(state)
</script>

<style scoped lang="scss"></style>
