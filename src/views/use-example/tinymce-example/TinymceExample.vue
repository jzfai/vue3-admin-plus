<template>
  <div class="scroll-y">
    <div class="mb-1">
      <el-button @click="setTinyContent">设置文本消息</el-button>
      <el-button @click="getTinyContent">获取文本消息</el-button>
    </div>
    <Tinymce ref="refTinymce" />
    <div class="mt-2">只读,readOnly为true</div>
    <Tinymce :read-only="true" />
  </div>
</template>

<script setup>
import Tinymce from '@/components/Tinymce/Tinymce.vue'
//获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
/*tinymce操作*/
const refTinymce = ref(null)
const setTinyContent = () => {
  if (refTinymce?.value) {
    refTinymce.value.setContent('tinymce设置的内容')
  }
}
const { elMessage } = useElement()
const getTinyContent = () => {
  if (refTinymce?.value) {
    let content = refTinymce.value.getContent()
    elMessage(content)
  }
}
</script>

<style scoped lang="scss"></style>
