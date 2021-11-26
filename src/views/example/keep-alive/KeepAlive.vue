<template>
  <div class="scroll-y">
    <div>KeepAlive.vue</div>
    <el-form ref="refsearchFormMixin" :inline="true" class="mt-2">
      <el-form-item label-width="0px" label="" prop="errorLog" label-position="left">
        <el-input v-model="searchFormMixin.errorLog" class="widthPx-150" placeholder="错误日志" />
      </el-form-item>
      <el-form-item label-width="0px" label="" prop="pageUrl" label-position="left">
        <el-input v-model="searchFormMixin.pageUrl" class="widthPx-150" placeholder="页面路径" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="routerDemoF">to routerDemoF.vue</el-button>
  </div>
</template>

<script>
export default {
  name: 'KeepAlive'
}
</script>

<script setup>
import { onActivated, onDeactivated, getCurrentInstance } from 'vue'
onActivated(() => {
  console.log('onActivated')
})
onDeactivated(() => {
  console.log('onDeactivated')
})
let { proxy } = getCurrentInstance()
const routerDemoF = () => {
  //推荐路由跳转根据router的name,这样在你修改路径时，只要不修改name，就没有影响。
  //推荐传递的是query参数，好处是刷新时可以回显，传入的obj对象会反序列化。
  proxy.routerPushMixin('routerDemoF', { name: 'routerDemoF' })
}
</script>

<style scoped lang="scss"></style>
