<template>
  <div id="Sidebar">
    <!--logo-->
    <Logo :collapse="!isCollapse" v-if="settings.sidebarLogo" />
    <!--router nav-->
    <el-scrollbar wrap-class="scrollbar-wrapper reset-menu-style">
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { getCurrentInstance, computed } from 'vue'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
//导入配置文件
import settings from '@/settings'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
let { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
let routes = computed(() => {
  return store.state.permission.routes
})
const isCollapse = computed(() => {
  return store.state.app.sidebar.opened
})
const variables = computed(() => {
  /*vite中获取scss变量有问题*/
  // let data=JSON.parse(JSON.stringify(scssVariables.replace(/:export/,'')))
  // console.log(typeof  JSON.parse(data));
  // return scssVariables
  return {
    menuText: '#bfcbd9',
    menuActiveText: '#409EFF',
    subMenuActiveText: '#f4f4f5',
    menuBg: '#304156',
    menuHover: '#263445',
    subMenuBg: '#1f2d3d',
    subMenuHover: '#001528',
    sideBarWidth: '210px'
  }
})
const activeMenu = computed(() => router.currentRoute.value.fullPath)
// let activeMenu2 = () => {
//   console.log("p1111ath",111);
//   const {meta, path} = router
//   // if set path, the sidebar will highlight the path you set
//   // if (meta.activeMenu) {
//   //   return meta.activeMenu
//   // }
//   console.log("path",path);
//   return path
// }
</script>

<style lang="scss">
.reset-menu-style {
  .el-menu {
    border-right: none;
  }
}
</style>
