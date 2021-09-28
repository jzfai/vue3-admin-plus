<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <div class="app-main" :key="key">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </div>
    </transition>
  </router-view>
</template>

<script setup>
import { getCurrentInstance, computed } from 'vue'
let { proxy } = getCurrentInstance()

const key = computed(() => {
  return proxy.$route.path
})
const cachedViews = computed(() => {
  return proxy.$store.state.app.cachedViews
})
</script>

<style scoped lang="scss">
.app-main {
  padding: 10px;
  /*50 = navbar  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: auto;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
