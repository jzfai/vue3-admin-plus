<template>
  <div class="scroll-y">
    <div>这是父组件</div>
    <Children ref="refChildren" father-name="Vue3Template" @emitParent="emitParent" />
    <el-button @click="childMethod">childMethod</el-button>
  </div>
</template>

<script setup>
//script-setup vue官方说明
//https://v3.cn.vuejs.org/api/sfc-script-setup.html#使用组件
import { onMounted, getCurrentInstance, ref } from 'vue'
import Children from './Children.vue'
//获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'

const refChildren = ref(null)

onMounted(() => {
  /*获取子元素两种方法*/
  //第一种
  console.log(refChildren.value)
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
const fartherMethod = () => {
  console.log('fartherMethod')
}
defineExpose({ fartherMethod })
</script>

<style scoped lang="scss"></style>
