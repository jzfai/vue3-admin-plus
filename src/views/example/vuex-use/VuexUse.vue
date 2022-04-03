<template>
  <div>
    <div>getter</div>
    <el-button @click="getterFunc">获取getter:{{ getterValue }}</el-button>
    <div class="mt-2">commit</div>
    <el-button @click="c_openSideBar">c_openSideBar</el-button>
    <el-button @click="c_closeSideBar">c_closeSideBar</el-button>
    <div class="mt-2">action</div>
    <el-button @click="openSideBar">openSideBar</el-button>
    <el-button @click="closeSideBar">closeSideBar</el-button>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
/*getter*/
const getterValue = ref(null)
const getterFunc = () => {
  getterValue.value = appStore.cachedViews
}

/*mutations*/
/*建议commit用M_开头 action用A_开头*/

const c_openSideBar = () => {
  appStore.M_sidebar_opened(true)
}
const c_closeSideBar = () => {
  appStore.M_sidebar_opened(false)
}
/*actions*/
const openSideBar = () => {
  appStore.A_sidebar_opened(true)
}
const closeSideBar = () => {
  appStore.A_sidebar_opened(false)
}
</script>

<style scoped lang="scss"></style>
