<template>
  <component :is="Component" />
</template>

<script setup>
import LoginAlt from './login-alt.vue'
import LoginBase from './login-base.vue'
import LoginLighting from './login-lighting.vue'

const renderNum = Math.floor(Math.random() * 10) + 1

const Component = computed(() => {
  if (renderNum <= 2) {
    return LoginBase
  } else if (renderNum <= 4 && renderNum > 2) {
    return LoginLighting
  }
  return LoginAlt
})
</script>

<style scoped lang="scss"></style>
