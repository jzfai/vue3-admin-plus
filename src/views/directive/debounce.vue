<template>
  <div>
    <el-button v-debounce="getData(123)" type="primary">防抖按钮</el-button>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

const getData = (str) => {
  return function () {
    console.log(str);
    ElMessage({
      type: "success",
      message: "正在拉取数据",
    });
  };
};
onUnmounted(() => {
  ElMessage.closeAll();
});
</script>

<style lang="scss" scoped></style>
