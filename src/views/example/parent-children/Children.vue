<template>
  <div>
    <div>{{ name }}</div>
    <el-button @click="emitFather">emitFather</el-button>
    <el-button @click="getFatherMethod">getFatherMethod</el-button>
    <SubChildren />
  </div>

  <div class="mt-2">插槽</div>
  <!-- 默认插槽 -->
  <slot>
    <!-- slot内为后备内容 -->
    <h3>没传内容</h3>
  </slot>
  <!-- 具名插槽 -->
  <header>
    <slot name="header">
      <h3>没传header插槽</h3>
    </slot>
  </header>
  <!-- 作用域插槽 -->
  <footer>
    <slot name="footer" testProps="子组件作用域传的值">
      <h3>没传footer插槽</h3>
    </slot>
  </footer>

  <div class="mt-2">v-model sync</div>
  <div>{{ childrenTitle }}</div>
  <el-button @click="changeParentValue">changeParentValue</el-button>
</template>

<script setup>
import SubChildren from '@/views/example/parent-children/SubChildren.vue'

const props = defineProps({
  fatherName: {
    require: true,
    default: '',
    type: String
  },
  childrenTitle: {
    require: true,
    default: '',
    type: String
  }
})
let state = reactive({
  name: 'Children'
})
//导出给refs使用
let childRef = ref('childRef')
let childMethod = () => {
  return 'childMethod'
}

let { proxy } = getCurrentInstance()
let getFatherMethod = () => {
  proxy.$parent.fartherMethod()
}
//emit
// 定义emit事件
const emit = defineEmits(['emitParent', 'update:childrenTitle'])
const emitFather = () => {
  emit('emitParent', { val: '子组件传递的信息' })
}
onMounted(() => {
  console.log('得到父元素的prop', props.fatherName)
})

//v-model sync
onMounted(() => {
  console.log('this is v-model parent data:' + props.childrenTitle)
})
const changeParentValue = () => {
  emit('update:childrenTitle', 'update it childrenTitle')
}
defineExpose({ childRef, childMethod })
//export to page for use
let { name } = toRefs(state)
</script>

<style scoped lang="scss"></style>
