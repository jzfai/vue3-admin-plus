<template>
  <el-tag  :class="labelItem.elTagClass" :type="labelItem.elTagType === 'primary' ? '' : labelItem.elTagType">
    {{label}}

  </el-tag>
</template>

<script setup>
const props = defineProps({
  // 数据
  options: {
    type: Array,
    default: null
  },
  // 当前的值
  value: [Number, String, Array]
})
const labelItem=ref({})
const label = computed(() => {
  labelItem.value= props.options.find((item)=>{
    return item.dictValue==props.value
  })
  return  labelItem.value.dictLabel
})
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
