<template>
  <div class="layout-container">
    <div class="layout-container-table">
      点击状态：{{ sideStr }}
      <div v-clickoutside="setData" class="box">
        <span>InSide</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const sideStr = ref("");
const setData = (type) => {
  if (type) {
    sideStr.value = "outSide";
  } else {
    sideStr.value = "inSide";
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 200px;
  background: red;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 40px;
}
</style>
