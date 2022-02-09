<template>
  <div id="tags-view-container" class="tags-view-container">
    <div class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="refTag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <Close v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></Close>
      </router-link>
    </div>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script setup>
import path from 'path'
import { Close } from '@element-plus/icons-vue'
import { onMounted, getCurrentInstance, watch, ref, toRefs, reactive, computed, nextTick } from 'vue'
//获取store和router
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const $router = useRouter()
const $route = useRoute()
const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: []
})

const visitedViews = computed(() => {
  return store.state.tagsView.visitedViews
})
const routes = computed(() => {
  return store.state.permission.routes
})

watch(
  () => $route.path,
  () => {
    addTags()
    // tag remove has issue
    // moveToCurrentTag()
  }
)
watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

onMounted(() => {
  initTags()
  addTags()
})

const isActive = (route) => {
  return route.path === $route.path
}
const isAffix = (tag) => {
  return tag.meta && tag.meta.affix
}

const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}
const initTags = () => {
  const affixTags = (state.affixTags = filterAffixTags(routes.value))
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      store.dispatch('tagsView/addVisitedView', tag)
    }
  }
}

const addTags = () => {
  const { name } = $route
  if (name) {
    store.dispatch('tagsView/addView', $route)
  }
  return false
}
const refreshSelectedTag = (view) => {
  const { fullPath } = view
  nextTick(() => {
    $router.replace({
      path: '/redirect' + fullPath
    })
  })
}
const closeSelectedTag = (view) => {
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}
const closeOthersTags = () => {
  $router.push(state.selectedTag)
  store.dispatch('tagsView/delOthersViews', state.selectedTag)
}
const closeAllTags = (view) => {
  store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    if (state.affixTags.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}
const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    $router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      $router.replace({ path: '/redirect' + view.fullPath })
    } else {
      $router.push('/')
    }
  }
}
const proxy = getCurrentInstance().proxy
const openMenu = (tag, e) => {
  const menuMinWidth = 105
  const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
  const offsetWidth = proxy.$el.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }
  state.top = e.clientY
  state.visible = true
  state.selectedTag = tag
}
const closeMenu = () => {
  state.visible = false
}
// const handleScroll = () => {
//   closeMenu()
// }

//export to page use
let { visible, top, left, selectedTag } = toRefs(state)
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: $tagViewHeight;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 27px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 3px;
      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    border-radius: 3px;
    .el-icon-close {
      border-radius: 6px;
      width: 12px;
      height: 12px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      vertical-align: -2px;
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
