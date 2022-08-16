<template>
  <div>
    <div class="mb-1">DeepRouterKeepAlive.vue</div>
    <el-input v-model="testInput" class="w-300px mb-3" placeholder="input test keepAlive(DeepRouterKeepAlive)" />
    <!--  three router   -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViewsDeep">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
defineOptions({ name: 'DeepRouterKeepAlive' })
import { useAppStore } from '@/store/app'

let testInput = ref('')
const appStore = useAppStore()
const cachedViewsDeep = computed(() => {
  return appStore.cachedViewsDeep
})
</script>

<style scoped lang="scss"></style>
