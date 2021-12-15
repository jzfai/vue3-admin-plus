<template>
  <div class="scroll-y">
    <h3 class="mb-2">props operate demo of settings.js</h3>
    <div class="rowSS">
      <div class="mb-1">
        page layout related
        <div class="mt-2">
          sidebarLogo：
          <el-switch v-model="store.state.app.settings.sidebarLogo" />
        </div>
        <div class="mt-3">
          showNavbarTitle：
          <el-switch v-model="store.state.app.settings.showNavbarTitle" />
        </div>
        <div class="mt-3">
          ShowDropDown：
          <el-switch v-model="store.state.app.settings.ShowDropDown" />
        </div>
        <div class="mt-3">
          showHamburger：
          <el-switch v-model="store.state.app.settings.showHamburger" />
        </div>
        <div class="mt-3">
          showLeftMenu：
          <el-switch v-model="store.state.app.settings.showLeftMenu" />
        </div>
        <div class="mt-3">
          showTagsView：
          <el-switch v-model="store.state.app.settings.showTagsView" />
        </div>
        <div class="mt-3">
          showTopNavbar：
          <el-switch v-model="store.state.app.settings.showTopNavbar" />
        </div>
      </div>

      <div class="mb-1 ml-6">
        page animation related
        <div class="mt-2">
          mainNeedAnimation：
          <el-switch v-model="store.state.app.settings.mainNeedAnimation" />
        </div>
        <div class="mt-3">
          isNeedNprogress：
          <el-switch v-model="store.state.app.settings.isNeedNprogress" />
        </div>
      </div>
    </div>
    <el-button type="primary" @click="testChangeSettings">testChangeSettings</el-button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
let settings = computed(() => {
  return store.state.app.settings
})

const testChangeSettings = () => {
  store.commit('app/M_settings', { sidebarLogo: !settings.value.sidebarLogo })
}
</script>

<style scoped lang="scss"></style>
