<template>
  <el-tag :type="labelItem.elTagType === 'primary' ? '' : labelItem.elTagType">{{label}}</el-tag>
</template>

<script setup>
import {getItem} from "@/hooks/use-data-dict";
const props = defineProps({
  // 数据
  dataTypeName: {
    type: String,
    default: null
  },
  // 数据
  options: {
    type: Array,
    default: null
  },
  // 当前的值
  value: [Number, String, Array]
})
const labelItem=ref({})
getItem(props.dataTypeName,props.value).then((res)=>{
  labelItem.value=res
})
const label = computed(() => {
  return labelItem.value.label
})
</script>
