<template>
  <div>getter</div>
  <el-button @click="getterFunc">获取getter:{{ getterValue }}</el-button>
  <div class="mt-2">commit</div>
  <el-button @click="c_openSideBar">c_openSideBar</el-button>
  <el-button @click="c_closeSideBar">c_closeSideBar</el-button>
  <div class="mt-2">action</div>
  <el-button @click="openSideBar">openSideBar</el-button>
  <el-button @click="closeSideBar">closeSideBar</el-button>
</template>

<script setup>
import { onMounted, getCurrentInstance, watch, ref, toRefs, reactive, computed } from 'vue'
//获取store和router
// import {useRouter} from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
let { proxy } = getCurrentInstance()

/*getter*/
let getterValue = ref(null)
const getterFunc = () => {
  getterValue.value = store.getters.cachedViews
}

/*mutations*/
/*建议commit用M_开头 action用A_开头*/
const c_openSideBar = () => {
  store.commit('app/M_sidebar_opened', true)
}
const c_closeSideBar = () => {
  store.commit('app/M_sidebar_opened', false)
}
/*actions*/
const openSideBar = () => {
  store.dispatch('app/A_sidebar_opened', true)
}
const closeSideBar = () => {
  store.dispatch('app/A_sidebar_opened', false)
}
// const props = defineProps({
//   name: {
//     require: true,
//     default: "fai",
//     type:String,
//   },
// });
// const state = reactive({
//   levelList: null
// });

//const routes = computed(() => {
//    return proxy.$store.state.permission.routes;
//  });
// watch(() => props.name, (oldValue,newValue) => {
//
//   },
//   { immediate: true }
// );

// const store = useStore()
// const router = useRouter()
// onMounted(()=>{
//   console.log("页面挂载了")
// })
// let helloFunc = () => {
//   console.log("helloFunc");
// };
//导出给refs使用
// defineExpose({ helloFunc });
//导出属性到页面中使用
// let {levelList} = toRefs(state);
</script>

<style scoped lang="scss"></style>
