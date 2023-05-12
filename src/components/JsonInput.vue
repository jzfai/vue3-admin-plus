<template>
  <json-editor-vue v-model="jsonData" :mode-list="couldView" style="width: 450px" current-mode="code" />
</template>

<script setup lang="ts">
//1.导入json-editor-vue3
//2.定义修改的json字段的值,
import { elMessage } from '@/hooks/use-element'

const couldView = ref(['tree', 'code', 'form', 'view'])

const jsonData = ref({})
const initData = (data) => {
  if (data) {
    jsonData.value = JSON.parse(JSON.parse(data))
  }
}

const returnData = () => {
  try {
    if (jsonData.value) {
      return JSON.stringify(jsonData.value)
    }
  } catch (err) {
    elMessage(err, 'warning')
  }
  return ''
}

defineExpose({ initData, returnData })
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.modal-style {
  width: 1000px !important;
  min-height: 500px;
}
</style>
