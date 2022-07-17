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
import getPageTitle from '@/utils/getPageTitle'
import useI18n from '@/hooks/useI18n'

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

const { generateTitle } = useI18n()
watch(
  () => route.name,
  () => {
    //设置title
    // set page title
    document.title = getPageTitle(generateTitle(route.meta.title))
    /*二三级路由缓存*/
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

      //取的是第二级的name
      if (parentRoute.name && parentRoute.meta?.cachePage) {
        deepOldRouter = parentRoute
        appStore.M_ADD_CACHED_VIEW(deepOldRouter.name)
        if (route.name) {
          if (route.meta?.cachePage) {
            //和第三级的name进行缓存
            appStore.M_ADD_CACHED_VIEW_DEEP(route.name)
          }
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
  padding: var(--app-main-padding);
  /*50 = navbar  */
  position: relative;
  overflow: hidden;
  background-color: var(--app-main-background);
}
.show-tag-view {
  height: calc(100vh - #{var(--nav-bar-height)} - #{var(--tag-view-height)}) !important;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
