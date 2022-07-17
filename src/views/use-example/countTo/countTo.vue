<template>
  <div>
    <span>
      {{ value.toFixed(2) }}
    </span>
    <el-button class="ml-1" type="primary" @click="toggle">开始</el-button>
  </div>
</template>
<script setup>
import { useTransition, TransitionPresets } from '@vueuse/core'

const baseNumber = ref(0)
const duration = 2500

const toggle = () => {
  baseNumber.value += 100
}
const value = useTransition(baseNumber, {
  duration,
  //动画效果库
  //https://vueuse.org/core/usetransition/#usage
  transition: TransitionPresets.easeOutExpo
})
</script>
