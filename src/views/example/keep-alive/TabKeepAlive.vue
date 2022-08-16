<template>
  <div class="scroll-y">
    <div class="mb-3">TabKeepAlive.vue</div>
    <el-input v-model="searchForm.pageUrl" class="w-300px" placeholder="input to test TabKeepAlive" />
  </div>
</template>

<!--
使用keep-alive
1.设置name（必须）
2.在路由配置处设置cachePage：即可缓存
-->
<script setup>
defineOptions({ name: 'TabKeepAlive' })
let { searchForm } = useCommon()
//$ref(experimental)
//let testRef = $ref(1)
let testRef = ref(1)
//赋值
testRef.value = 2
// console.log(testRef.value)

onActivated(() => {
  console.log('onActivated')
})
onDeactivated(() => {
  console.log('onDeactivated')
})
</script>

<style scoped lang="scss"></style>
