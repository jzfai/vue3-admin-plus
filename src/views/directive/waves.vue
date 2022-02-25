<template>
  <div>
    <el-button v-waves type="primary">水波纹效果指令</el-button>
    <div v-waves class="box"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  background-color: pink;
}
</style>
