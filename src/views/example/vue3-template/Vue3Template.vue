<template>
  <div>vue3推荐模板可以集成在你们的vscode或webstorm中，有助于快速开发</div>
</template>

<script setup>
//import { onMounted, getCurrentInstance, watch, ref, toRefs, reactive, computed } from 'vue'
// 获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
const props = defineProps({
  name: {
    require: true,
    default: 'fai',
    type: String
  }
})
const state = reactive({
  levelList: null
})
const store = useStore()
const routes = computed(() => {
  return store.state.permission.routes
})
watch(
  () => props.name,
  (oldValue, newValue) => {},
  { immediate: true }
)

const router = useRouter()
onMounted(() => {
  console.log('页面挂载了')
})
let helloFunc = () => {
  console.log('helloFunc')
}
// 导出属性到页面中使用
let { levelList } = toRefs(state)
// 导出给父组件使用
defineExpose({ helloFunc })
</script>

<style scoped lang="scss"></style>
