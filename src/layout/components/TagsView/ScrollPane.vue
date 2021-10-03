<template>
  <el-scrollbar ref="refScrollContainer" :vertical="false" class="scroll-container" @wheel="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script setup>
const tagAndTagSpacing = 4 // tagAndTagSpacing
import { onMounted, getCurrentInstance, ref, reactive, computed, onBeforeUnmount } from 'vue'
let { proxy } = getCurrentInstance()
reactive({
  left: 0
})

const refScrollContainer = ref(null)
const scrollWrapper = computed(() => {
  return refScrollContainer.value.wrap
})
onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})
onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})
const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}
const emit = defineEmits(['scroll'])
const emitScroll = () => {
  emit('scroll')
}
const moveToTarget = (currentTag) => {
  const $container = refScrollContainer.value.$el
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = scrollWrapper.value
  const tagList = proxy.$parent.$refs.tag

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}
//expose to refs
defineExpose({ moveToTarget })
</script>

<style scoped lang="scss"></style>
