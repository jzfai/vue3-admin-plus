<template>
  <div>
    <div>getter</div>
    <el-button @click="getterFunc">获取getter:{{ getterValue }}</el-button>
    <div class="mt-2">commit</div>
    <el-button @click="c_openSideBar">c_openSideBar</el-button>
    <el-button @click="c_closeSideBar">c_closeSideBar</el-button>
    <div class="mt-2">action</div>
    <el-button @click="openSideBar">openSideBar</el-button>
    <el-button @click="closeSideBar">closeSideBar</el-button>
    <div>是否开启：{{ opened }}</div>
  </div>
</template>

<script>
/*可以设置默认的名字*/
import { mapState } from 'vuex'
export default {
  name: 'Login',
  computed: {
    ...mapState({
      opened: (state) => state.app,
      opened2: (state) => state.app
    })
  }
}
</script>

<script setup>
const store = useStore()
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
</script>

<style scoped lang="scss"></style>
