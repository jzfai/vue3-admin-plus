<template>
  <el-icon class="el-svg-icon">
    <component :is="ElSvg[elSvgName]" />
  </el-icon>
</template>

<script setup>
import * as ElSvg from '@element-plus/icons-vue'
const props = defineProps({
  elSvgName: {
    require: true,
    default: 'Fold',
    type: String
  }
})
const { elSvgName } = props
</script>

<style scoped lang="scss">
.el-svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  right: 3px;
  font-size: var(--sidebar-el-icon-size);
  text-align: left !important;
}
</style>
