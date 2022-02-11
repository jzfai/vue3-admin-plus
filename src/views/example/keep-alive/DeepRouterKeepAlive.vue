<template>
  <div>
    <div class="mb-1">DeepRouterKeepAlive.vue</div>
    <el-input v-model="testInput" class="widthPx-300 mb-3" placeholder="input test keepAlive(DeepRouterKeepAlive)" />
    <!--  three router   -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViewsDeep">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup name="DeepRouterKeepAlive">
let testInput = ref('')
const $store = useStore()
const cachedViewsDeep = computed(() => {
  return $store.state.app.cachedViewsDeep
})
</script>

<style scoped lang="scss"></style>
