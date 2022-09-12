<template>
  <div id="Sidebar" class="reset-menu-style">
    <!--logo-->
    <Logo v-if="settings.sidebarLogo" :collapse="!isCollapse" />
    <!--router nav-->
    <el-scrollbar>
      <el-menu
        class="el-menu-vertical pb20"
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
//导入配置文件
const appStore = useAppStore()
const settings = computed(() => {
  return appStore.settings
})

const route = useRoute()
const permissionStore = usePermissionStore()
const routes = computed(() => {
  return permissionStore.routes
})
const isCollapse = computed(() => {
  return appStore.sidebar.opened
})

//change  scss variable to js
// const dillScssExportToJson = (scssExportJson) => {
//   const jsonString = scssExportJson.replace(/:export\s*/, '').replace(/[\s+\r\n]/g, '')
//   const scssJson = {}
//   jsonString
//     .slice(1, jsonString.length - 2)
//     .split(';')
//     .forEach((fItem) => {
//       const arr = fItem.split(':')
//       scssJson[arr[0]] = arr[1]
//     })
//   return scssJson
// }
// import scssExportJson from '@/styles/variables-to-js.scss'
// import { ObjTy } from '~/common'
// const scssJson = dillScssExportToJson(scssExportJson)
//get scss variable

import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>
<style lang="scss">
//fix open the item style issue
.el-menu-vertical {
  width: var(--side-bar-width);
}
</style>
