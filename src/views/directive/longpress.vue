<template>
  <div>
    <el-button v-longpress="setData">长按指令</el-button>
    <p>{{ data }}</p>
  </div>
</template>

<script setup>
let data = ref("");
const setData = () => {
  data.value = "执行长按指令";
};
</script>

<style lang="scss" scoped></style>
