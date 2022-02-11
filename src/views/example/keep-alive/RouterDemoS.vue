<template>
  <div class="scroll-y">
    <h2>RouterDemos.vue</h2>
    <el-form ref="refsearchForm" :inline="true" class="mt-2">
      <el-form-item label-width="0px" label="" prop="errorLog" label-position="left">
        <el-input v-model="searchForm.errorLog" class="widthPx-150" placeholder="input to test keepAlive" />
      </el-form-item>
      <el-form-item label-width="0px" label="" prop="pageUrl" label-position="left">
        <el-input v-model="searchForm.pageUrl" class="widthPx-150" placeholder="input to test keepAlive" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="routerBack">返回</el-button>
  </div>
</template>

<script setup name="routerDemoS">
let searchForm = useCommon().searchForm
let { routerBack, routerPush, getQueryParam } = useVueRouter()
onMounted(() => {
  //get page pass url data
  console.log(getQueryParam())
})
</script>

<style scoped lang="scss"></style>
