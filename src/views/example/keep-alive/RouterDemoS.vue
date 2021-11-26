<template>
  <div class="scroll-y">
    <h2>RouterDemos.vue</h2>
    <el-form ref="refsearchFormMixin" :inline="true" class="mt-2">
      <el-form-item label-width="0px" label="" prop="errorLog" label-position="left">
        <el-input v-model="searchFormMixin.errorLog" class="widthPx-150" placeholder="demo1" />
      </el-form-item>
      <el-form-item label-width="0px" label="" prop="pageUrl" label-position="left">
        <el-input v-model="searchFormMixin.pageUrl" class="widthPx-150" placeholder="demo1" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="routerBackMixin">返回</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
let { proxy } = getCurrentInstance()
onMounted(() => {
  //get page pass url data
  console.log(proxy.queryParamsMixin)
})
</script>

<style scoped lang="scss"></style>
