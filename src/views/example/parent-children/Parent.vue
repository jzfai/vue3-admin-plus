<template>
  <div>这是父组件</div>
  <Children ref="refChildren" father-name="Vue3Template" @emitParent="emitParent" />
  <el-button @click="childMethod">childMethod</el-button>
</template>

<script setup>
//script-setup vue官方说明
//https://v3.cn.vuejs.org/api/sfc-script-setup.html#使用组件
import { onMounted, getCurrentInstance, watch, ref, toRefs, reactive, computed } from 'vue'
import Children from './Children.vue'
//获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
let { proxy } = getCurrentInstance()

let refChildren = ref(null)
onMounted(() => {
  /*获取子元素两种方法*/
  //第一种
  console.log(proxy.$refs['refChildren'].value)
  //第二种
  console.log(refChildren.value)
})
const childMethod = () => {
  console.log(refChildren.value.childMethod())
  console.log(refChildren.value.childRef)
}
const emitParent = (data) => {
  console.log('得到子组件的信息111', data)
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

// const routes = computed(() => {
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
