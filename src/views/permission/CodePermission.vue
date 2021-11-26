<template>
  <div class="colePermission">
    <div>测试前请确定设置了setting.js文件里permissionMode为code模式</div>
    <div style="margin-bottom: 15px">Your codeArr: {{ codeArr }}</div>
    Switch roles:
    <div>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="[1]">show CodePage</el-radio-button>
        <el-radio-button label="[]">hide CodePage</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
//获取store和router
const codeArr = computed(() => {
  return localStorage.getItem('codeArr')
})
// const emit = defineEmits(['change'])
const switchRoles = computed({
  get() {
    return JSON.parse(localStorage.getItem('codeArr'))
  },
  set(val) {
    localStorage.setItem('codeArr', JSON.stringify(val))
    location.reload()
  }
})
</script>

<style scoped lang="scss"></style>
