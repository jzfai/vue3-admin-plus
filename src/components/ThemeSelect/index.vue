<template>
  <el-dropdown trigger="click" type="primary" @command="handleSettheme">
    <svg-icon icon-class="theme-icon" class="theme-icon-style" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in themeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="appStore.theme === item.value"
        >
          <h3 class="pt-1 pb-1 font-themePx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
const state = reactive({
  themeOptions: [
    { label: 'base', value: 'base-theme' },
    { label: 'dark', value: 'dark' },
    { label: 'lighting', value: 'lighting-theme' }
  ]
})

import { useAppStore } from '@/store/app'
const appStore = useAppStore()
const handleSettheme = (theme) => {
  localStorage.setItem('theme', theme)
  appStore.theme = theme
  toggleHtmlClass(theme)
  // location.reload()
}

import { toggleHtmlClass } from '@/theme/utils'
toggleHtmlClass(appStore.theme)
//导出属性到页面中使用
let { themeOptions } = toRefs(state)
</script>

<style scoped lang="scss">
.theme-icon-style {
  height: 23px;
  width: 23px;
  margin-left: 8px;
  margin-right: 8px;
  color: #494949; //#ff9901;
  position: relative;
  font-weight: bold;
  top: 1px;
}
</style>
