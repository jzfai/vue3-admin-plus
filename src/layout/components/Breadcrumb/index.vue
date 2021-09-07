<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { onMounted, onBeforeMount, getCurrentInstance, watch, ref, toRefs, reactive, computed } from 'vue'
import { compile } from 'path-to-regexp'
//获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
let levelList = ref(null)
let { proxy } = getCurrentInstance()
const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = proxy.$route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]
  if (!isDashboard(first)) {
    //it can replace the first page if not exits
    // matched = [{path: '/dashboard', meta: {title: 'Dashboard'}}].concat(matched)
  }
  levelList.value = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
  console.log('levelList', levelList)
}

const isDashboard = (route) => {
  const name = route?.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
const pathCompile = (path) => {
  const { params } = proxy.$route
  const toPath = compile(path)
  return toPath(params)
}
const handleLink = (item) => {
  const { redirect, path } = item
  if (redirect) {
    proxy.$router.push(redirect)
    return
  }
  proxy.$router.push(pathCompile(path))
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
watch(
  () => proxy.$route,
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)
// const store = useStore()
// const router = useRouter()
onMounted(() => {
  console.log(proxy.$route)
})
onBeforeMount(() => {
  getBreadcrumb()
})
// let helloFunc = () => {
//   console.log("helloFunc");
// };
//导出给refs使用
// defineExpose({ helloFunc });
//导出属性到页面中使用
// let {levelList} = toRefs(state);
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
