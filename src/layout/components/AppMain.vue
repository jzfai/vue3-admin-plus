<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <div class="app-main" :class="{ 'show-tag-view': setting.showTagsView }" :key="key">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </div>
    </transition>
  </router-view>
</template>

<script setup>
import setting from '@/settings'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const key = computed(() => {
  return useRoute().path
})
let store = useStore()
const cachedViews = computed(() => {
  //TagsView is open: open using cachedViews of TagsView, otherwise using app
  if (setting.showTagsView) {
    return store.state.app.cachedViews
  } else {
    return store.state.app.cachedViews
  }
})
</script>

<style scoped lang="scss">
.app-main {
  padding: 10px;
  /*50 = navbar  */
  height: calc(100vh - #{$navBarHeight});
  width: 100%;
  position: relative;
  overflow: auto;
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
