<template>
  <div class="pl-6px pr-6px mt-2px">
    <svg-icon icon-class="lock" class="nav-svg-icon" @click="open = true" />
  </div>
  <transition enter-active-class="screen-locker-lock" leave-active-class="screen-locker-unlock">
    <div v-if="open" class="screen-locker">
      <div class="screen-avatar">
        <el-avatar round :size="128" src="https://github.jzfai.top/file/images/nav-right-logo.gif" />
        <div class="screen-nickname">Vue3 Admin Plus</div>
      </div>
      <div ref="slider" class="screen-slider">
        <div class="screen-locker-placeholder">滑动解锁</div>
        <div ref="sliderButton" class="screen-slider-button" @mousedown="onMousedown">
          <el-icon :size="25">
            <icon />
          </el-icon>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ArrowRightBold, Unlock } from '@element-plus/icons-vue'

const open = ref(false)
const slider = ref(null)
const sliderButton = ref(null)
let startX = 0
let distance = 0
let maxDistance = 0
let minDistance = 0
const isTrigger = ref(false)

const onMousedown = (e) => {
  distance = 0
  maxDistance = 0
  minDistance = 0
  isTrigger.value = false

  sliderButton.value.style.transition = ''
  startX = e.screenX
  maxDistance = slider.value.clientWidth - sliderButton.value.clientWidth - 10
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

const onMousemove = (e) => {
  distance = e.screenX - startX
  if (isTrigger.value) {
    distance = maxDistance
  }
  if (distance <= minDistance) {
    distance = minDistance
  }
  if (distance >= maxDistance) {
    distance = maxDistance
    if (!isTrigger.value) {
      isTrigger.value = true
      setTimeout(() => {
        open.value = false
      }, 300)
    }
  }
  if (open.value) {
    sliderButton.value.style.transform = `translateX(${distance}px)`
  }
}

const onMouseup = () => {
  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)

  if (!isTrigger.value) {
    // 恢复原始状态
    distance = 0
    maxDistance = 0
    minDistance = 0
    isTrigger.value = false

    if (open.value) {
      sliderButton.value.style.transition = 'all 0.4s'
      sliderButton.value.style.transform = `translateX(${distance}px)`
    }
  }
}
watch(
  () => open.value,
  () => {
    if (open.value) {
      isTrigger.value = false
    }
  }
)

const icon = computed(() => {
  return isTrigger.value ? Unlock : ArrowRightBold
})
</script>

<style scoped>
.screen-locker {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
  /* backdrop-filter暂不兼容firefox */
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px 5px #0000000f;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.screen-locker-lock {
  animation: lock-down 1s ease-in-out;
}

.screen-locker-unlock {
  animation: lock-up 1s ease-in-out;
}

@keyframes lock-down {
  0% {
    transform: translate3d(0, -100%, 0);
  }
  60% {
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0px, 0, 0);
  }
  90% {
    transform: translate3d(0px, 0, 0);
  }
  100% {
    transform: none;
  }
}

@keyframes lock-up {
  0% {
    transform: translate3d(0, 0px, 0);
  }
  90% {
    transform: translate3d(0px, -100%, 0);
  }
  100% {
    transform: none;
    opacity: 0;
  }
}

.screen-avatar {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.screen-nickname {
  font-size: 30px;
  font-weight: 400;
  margin-top: 10px;
}

.screen-slider {
  width: 300px;
  height: 60px;
  border-radius: 100px;
  background-image: linear-gradient(to right, rgb(72 168 237 / 25%), rgba(255, 255, 255, 0.4), rgb(72 168 237 / 25%));
  /* 背景渐变色大小 */
  background-size: 200%;
  animation: sun 7s infinite;
  position: relative;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
}

.screen-slider:before {
  content: '';
  position: absolute;
  top: -6px;
  bottom: -6px;
  left: -6px;
  right: -6px;
  border-radius: 60px;
  background-image: linear-gradient(to right, rgb(72 168 237 / 25%), rgba(255, 255, 255, 0.4), rgb(72 168 237 / 25%));
  background-size: 200%;
  z-index: -1;
  /* 设置模糊度 显示发光效果 */
  filter: blur(10px);
  opacity: 0.5;
  animation: sun 7s infinite;
}

.screen-slider-button {
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.screen-locker-placeholder {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
  opacity: 0.5;
  user-select: none;
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
</style>
