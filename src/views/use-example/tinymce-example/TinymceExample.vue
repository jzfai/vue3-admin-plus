<template>
  <div class="mb-1">
    <el-button @click="setTinyContent">设置文本消息</el-button>
    <el-button @click="getTinyContent">获取文本消息</el-button>
  </div>

  <Tinymce ref="refTinymce" />
  <div class="mt-2">只读,readOnly为true</div>
  <Tinymce :readOnly="true" />
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import Tinymce from '@/components/Tinymce/Tinymce.vue'
//获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
let { proxy } = getCurrentInstance()

/*tinymce操作*/
const refTinymce = ref(null)
const setTinyContent = () => {
  refTinymce.value.setContent('tinymce设置的内容')
}
const getTinyContent = () => {
  let content = refTinymce.value.getContent()
  proxy.elMessageMixin(content)
}
</script>

<style scoped lang="scss"></style>
