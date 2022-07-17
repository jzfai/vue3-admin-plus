<template>
  <div style="padding: 0 12px" @click="toggleClick">
    <svg-icon icon-class="hamburger" :class="{ 'is-active': isActive }" class="hamburger-style" />
  </div>
</template>

<script setup>
import SvgIcon from '@/icons/SvgIcon.vue'

defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggleClick'])
const toggleClick = () => {
  emit('toggleClick')
}
</script>

<style scoped lang="scss">
.hamburger-style {
  color: var(--hamburger-color);
  width: var(--hamburger-width);
  height: var(--hamburger-height);
  cursor: pointer;
}

.hamburger-style.is-active {
  transform: rotate(180deg);
}
</style>
