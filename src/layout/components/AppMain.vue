<template>
  <div class="app-main" :class="{ 'show-tag-view': settings.showTagsView }">
    <router-view v-slot="{ Component }">
      <!--has transition  Judging by settings.mainNeedAnimation-->
      <transition v-if="settings.mainNeedAnimation" name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
      <!-- no transition -->
      <keep-alive v-else :include="cachedViews">
        <component :is="Component" :key="key" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'

const route = useRoute()
const settings = computed(() => {
  return appStore.settings
})

const key = computed(() => route.path)

const cachedViews = computed(() => {
  return appStore.cachedViews
})

/*listen the component name changing, then to keep-alive the page*/
// cachePage: is true, keep-alive this Page
// leaveRmCachePage: is true, keep-alive remote when page leave
let oldRoute = {}
let deepOldRouter = null

const appStore = useAppStore()
const removeDeepChildren = (deepOldRouter) => {
  deepOldRouter.children?.forEach((fItem) => {
    appStore.M_DEL_CACHED_VIEW_DEEP(fItem.name)
  })
}

watch(
  () => route.name,
  () => {
    const routerLevel = route.matched.length

    //二级路由处理
    if (routerLevel === 2) {
      if (deepOldRouter?.name) {
        if (deepOldRouter.meta?.leaveRmCachePage && deepOldRouter.meta?.cachePage) {
          appStore.M_DEL_CACHED_VIEW(deepOldRouter.name)
          //remove the deepOldRouter‘s children component
          removeDeepChildren(deepOldRouter)
        }
      } else {
        if (oldRoute?.name) {
          if (oldRoute.meta?.leaveRmCachePage && oldRoute.meta?.cachePage) {
            appStore.M_DEL_CACHED_VIEW(oldRoute.name)
          }
        }
      }

      if (route.name) {
        if (route.meta?.cachePage) {
          appStore.M_ADD_CACHED_VIEW(route.name)
        }
      }
      deepOldRouter = null
    }

    //三级路由处理
    if (routerLevel === 3) {
      //三级时存储当前路由对象的上一级
      const parentRoute = route.matched[1]
      //deepOldRouter不为空，且deepOldRouter不是当前路由的父对象，则需要清除deepOldRouter缓存
      //一般为三级路由跳转三级路由的情况
      if (deepOldRouter?.name && deepOldRouter.name !== parentRoute.name) {
        if (deepOldRouter.meta?.leaveRmCachePage && deepOldRouter.meta?.cachePage) {
          appStore.M_DEL_CACHED_VIEW(deepOldRouter.name)
          //remove the deepOldRouter‘s children component
          removeDeepChildren(deepOldRouter)
        }
      } else {
        //否则走正常两级路由处理流程
        if (oldRoute?.name) {
          if (oldRoute.meta?.leaveRmCachePage && oldRoute.meta?.cachePage) {
            appStore.M_DEL_CACHED_VIEW_DEEP(oldRoute.name)
          }
        }
      }

      if (route.name) {
        if (route.meta?.cachePage) {
          deepOldRouter = parentRoute
          //取的是第二级的name和第三级的name进行缓存
          appStore.M_ADD_CACHED_VIEW(deepOldRouter.name)
          appStore.M_ADD_CACHED_VIEW_DEEP(route.name)
        }
      }
    }
    oldRoute = JSON.parse(JSON.stringify({ name: route.name, meta: route.meta }))
  },
  { immediate: true }
)
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
