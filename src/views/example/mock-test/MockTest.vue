<template>
  <div>mock 使用示例(dev环境时使用)</div>
  <el-button @click="listReq" type="primary">点击发送mock请求</el-button>
</template>

<script setup>
// mock address https://blog.csdn.net/weixin_42067720/article/details/115579817
import { getCurrentInstance } from 'vue'
// import '@/mock/index.js'
import axios from 'axios'
//获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
let { proxy } = getCurrentInstance()
const listReq = () => {
  axios.get('/getMapInfo').then((res) => {
    if (res.data) {
      console.log(res.data)
      alert(res.data.title)
    }
  })
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
