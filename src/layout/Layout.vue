<!--suppress ALL -->
<template>
  <div :class="classObj" class="layout-wrapper">
    <!--左侧-->
    <Sidebar class="sidebar-container" v-if="settings.showLeftMenu" />
    <!--右侧-->
    <div class="main-container">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>
<!--原理vue2.0-->
<script>
/*可以设置默认的名字*/
export default {
  name: 'Layout'
}
</script>

<script setup>
import { Sidebar, Navbar, AppMain } from './components'
import { getCurrentInstance, computed } from 'vue'
import settings from '@/settings'
let { proxy } = getCurrentInstance()
let opened = computed(() => {
  return proxy.$store.state.app.sidebar.opened
})
let classObj = computed(() => {
  return {
    closeSidebar: !opened.value,
    hideSidebar: !settings.showLeftMenu
  }
})
//import ResizeHook to   listen  page size that   open or close
import H_ResizeHook from './hook/ResizeHandler'
H_ResizeHook()
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.layout-wrapper {
  //display: flex;
  //align-content: start;
  //justify-content: start;
}
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}
.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  background-color: $menuBg;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.closeSidebar {
  .sidebar-container {
    width: 54px !important;
  }
  .main-container {
    margin-left: 54px !important;
  }
}
.hideSidebar {
  .sidebar-container {
    width: 0 !important;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>
