<template>
  <div class="ml-6px">
    <el-button ref="buttonRef" v-click-outside="onClickOutside" circle icon="Menu" />
    <el-popover
      ref="popoverRef"
      width="120"
      :hide-after="0"
      :virtual-ref="buttonRef"
      trigger="click"
      virtual-triggering
    >
      <div class="content">
        <Draggable
          :list="draggableList"
          title=""
          :force-fallback="true"
          item-key="id"
          class="list-group"
          ghost-class="ghost"
        >
          <template #item="{ element }">
            <el-checkbox v-model="element.showColumn" :label="element.label" />
          </template>
        </Draggable>
        <div class="columnSC mt-10px">
          <el-button class="mt-10px" @click="handleReset">重置</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

import Draggable from 'vuedraggable'
const props = defineProps({
  cols: {
    type: Array
  },
  bakCols: {
    type: Array
  },
  isOperation: {
    type: Boolean
  }
})

const emit = defineEmits(['colChange'])

const heardColsString = ref('') // 弹框显隐

const draggableList = computed(() => {
  return props.cols
})

onMounted(() => {
  // 保存以前的数据
  nextTick(() => {
    heardColsString.value = JSON.stringify(props.cols)
  })
})

const handleReset = () => {
  emit('colChange', JSON.parse(heardColsString.value))
}
</script>

<style lang="scss" scoped></style>
