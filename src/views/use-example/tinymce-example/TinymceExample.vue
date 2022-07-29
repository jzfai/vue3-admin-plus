<template>
  <div class="scroll-y">
    <div class="mb-1">
      <el-button @click="setTinyContent">设置文本消息</el-button>
      <el-button @click="getTinyContent">获取文本消息</el-button>
      <el-button @click="clearTinyContent">清空内容</el-button>
    </div>
    <Tinymce ref="refTinymce"  />
  </div>
</template>

<script setup>
import Tinymce from "@/components/Tinymce/index.vue";
/*tinymce操作*/
const refTinymce = ref(null);
const setTinyContent = () => {
  if (refTinymce?.value) {
    refTinymce.value.setContent("tinymce设置的内容");
  }
};
const { elMessage } = useElement();
const getTinyContent = () => {
  if (refTinymce?.value) {
    let content = refTinymce.value.getContent();
    elMessage(content);
  }
};
const clearTinyContent = () => {
  if (refTinymce?.value) {
    refTinymce.value.setContent("");
  }
};

</script>

<style scoped lang="scss"></style>
