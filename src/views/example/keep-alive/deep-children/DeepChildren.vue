<template>
  <div class="mt-2">DeepChildren.vue third router render</div>
  <el-input v-model="testInput" placeholder="input test keepAlive(DeepChildren)" class="w-300px" />
</template>

<script setup>
defineOptions({ name: 'DeepChildren' })
let testInput = ref('')
</script>

<style scoped lang="scss"></style>
