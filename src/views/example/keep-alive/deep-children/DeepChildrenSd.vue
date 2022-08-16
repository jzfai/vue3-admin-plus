<template>
  <div class="mt-2">DeepChildrenSd.vue third router render</div>
  <el-input v-model="testInput" placeholder="input test keepAlive(DeepChildren)" class="w-300px" />
</template>

<script setup>
defineOptions({ name: 'DeepChildrenSd' })
let testInput = ref('')
</script>

<style scoped lang="scss"></style>
