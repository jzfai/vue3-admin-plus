<template>
  <div class="box">
    <el-input v-model="input" placeholder="输入需要粘贴的值"></el-input>
    <el-button v-copy="input" type="primary">复制到剪切板</el-button>
  </div>
</template>

<script setup>
let input = ref("");
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .el-input {
    margin-right: 10px;
  }
}
</style>
