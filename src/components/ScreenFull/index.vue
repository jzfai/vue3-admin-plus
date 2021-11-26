<template>
  <div class="pl-1 pr-1 mtPx-2">
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

<style lang="scss">
.nav-svg-icon {
  font-size: 18px;
  color: #5a5e66;
  margin-top: 4px;
}
</style>
