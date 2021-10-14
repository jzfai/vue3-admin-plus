<template>
  <div id="Sidebar" class="reset-menu-style">
    <!--logo-->
    <Logo :collapse="!isCollapse" v-if="settings.sidebarLogo" />
    <!--router nav-->
    <el-scrollbar>
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
import { computed } from 'vue'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
//导入配置文件
import settings from '@/settings'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const route = useRoute()
let routes = computed(() => {
  return store.state.permission.routes
})
const isCollapse = computed(() => {
  return store.state.app.sidebar.opened
})
const variables = computed(() => {
  // let data = JSON.parse(scssVariables.replace(/:export\s*/, ''))
  // console.log('scssVariables')
  // console.log(typeof data)
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
const activeMenu = computed(() => {
  const { meta, fullPath } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return fullPath
})
</script>

<style lang="scss">
.reset-menu-style {
  .el-menu {
    border-right: none;
  }
  .el-scrollbar__wrap {
    padding-bottom: 8vh;
  }
}
</style>
