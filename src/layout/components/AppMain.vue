<template>
  <div class="app-main" :class="{ 'show-tag-view': setting.showTagsView }">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import setting from '@/settings'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
let store = useStore()
let route = useRoute()

// cachePage: is true, keep-alive this Page
// leaveRmCachePage: is true, keep-alive remote when page leave
let oldRoute = null
const key = computed({
  get() {
    if (oldRoute?.name) {
      if (oldRoute.meta?.leaveRmCachePage && oldRoute.meta?.cachePage) {
        store.commit('app/M_DEL_CACHED_VIEW', oldRoute.name)
      }
    }
    if (route.name) {
      if (route.meta?.cachePage) {
        store.commit('app/M_ADD_CACHED_VIEW', route.name)
      }
    }
    oldRoute = JSON.parse(JSON.stringify({ name: route.name, meta: route.meta }))
    return route.path
  }
})

const cachedViews = computed(() => {
  return store.state.app.cachedViews
})
</script>

<style scoped lang="scss">
.app-main {
  padding: $appMainPadding;
  /*50 = navbar  */
  position: relative;
  overflow: hidden;
}
.show-tag-view {
  height: calc(100vh - #{$navBarHeight} - #{$tagViewHeight}) !important;
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
