<template>
  <svg-icon
    :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    style="width: 17px; height: 17px"
    class="mr-12px"
    @click="toggleScreen"
  />
</template>

<script setup lang="ts">
//@ts-ignore
import { onMounted, onUnmounted, reactive, toRefs } from 'vue'
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import SvgIcon from '@/icons/SvgIcon.vue'
const state = reactive({
  isFullscreen: false
})
onMounted(() => {
  init()
})
onUnmounted(() => {
  destroy()
})
const toggleScreen = () => {
  if (!screenfull.isEnabled) {
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
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
}
const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change)
  }
}
const { isFullscreen } = toRefs(state)
</script>

<style lang="scss" scoped>
.nav-svg-icon {
  font-size: 18px;
  color: #5a5e66;
  margin-top: 4px;
}
</style>
