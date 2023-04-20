<template>
  <!-- 如果有 elSvgIcon 显示 elSvgIcon 没有显示 icon-->
  <el-icon v-if="meta?.elSvgIcon" >
    <component :is="meta.elSvgIcon" />
  </el-icon>
  <div v-else-if="meta?.icon"  class="menu-svg-class"><svg-icon :icon-class="meta?.icon"   /></div>
</template>

<script setup lang="ts">
// import * as ElSvg from '@element-plus/icons-vue'
defineProps({
  meta: { type: Object, default: null }
})
</script>

<style scoped lang="scss">
.menu-svg-class {
  vertical-align: middle;
  margin-left: 1px;
  width: 29px;
  padding-left: 5px;
  text-align: left;
}
</style>
