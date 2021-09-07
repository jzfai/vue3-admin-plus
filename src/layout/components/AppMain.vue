<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!--<transition name="fade-transform" mode="out-in">-->
    <!--<div>-->
    <!---->
    <!--</div>-->
    <!--</transition>-->
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance, watch, ref, toRefs, computed, reactive } from 'vue'
//获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
let { proxy } = getCurrentInstance()
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

// string.instanceOf String
const key = computed(() => {
  return proxy.$route.path
})
const cachedViews = computed(() => {
  return proxy.$store.state.app.cachedViews
})
// const store = useStore()
// const router = useRouter()
// onMounted(()=>{
//   let string=[]
//   // console.log(proxy.$route)
// })
// let helloFunc = () => {
//   console.log("helloFunc");
// };
//导出给refs使用
// defineExpose({ helloFunc });
//导出属性到页面中使用
// let {levelList} = toRefs(state);
</script>

<style scoped lang="scss">
.app-main {
  padding: 10px;
  /*50 = navbar  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: auto;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
