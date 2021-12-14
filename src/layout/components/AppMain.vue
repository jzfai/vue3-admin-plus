<template>
  <div class="app-main" :class="{ 'show-tag-view': settings.showTagsView }">
    <router-view v-slot="{ Component }">
      <component :is="compType" :name="settings.mainNeedAnimation ?? 'fade-breadcrumb'">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </component>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
let store = useStore()
let route = useRoute()
let settings = computed(() => {
  return store.state.app.settings
})
//Whether close the animation fo breadcrumb
const compType = computed(() => {
  if (settings.value.mainNeedAnimation) {
    return 'transition'
  }
  return 'div'
})

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
