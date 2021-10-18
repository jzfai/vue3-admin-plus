<template>
  <div class="pl-1 pr-1">
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" class="nav-svg-icon" @click="click" />
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { onMounted, onUnmounted, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'

const state = reactive({
  isFullscreen: false
})

onMounted(() => {
  init()
})
onUnmounted(() => {
  destroy()
})

const click = () => {
  if (!screenfull.enabled) {
    ElMessage({
      message: 'you browser can not work',
      type: 'warning'
    })
    return false
  }
  screenfull.toggle()
}
const change = () => {
  state.isFullscreen = screenfull.isFullscreen
}
const init = () => {
  if (screenfull.enabled) {
    screenfull.on('change', change)
  }
}
const destroy = () => {
  if (screenfull.enabled) {
    screenfull.off('change', change)
  }
}
//导出属性到页面中使用
let { isFullscreen } = toRefs(state)
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
