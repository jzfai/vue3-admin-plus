<template>
  <div class="mt-2">DeepChildren.vue third router render</div>
  <el-input v-model="testInput" placeholder="input test keepAlive(DeepChildren)" class="widthPx-300" />
</template>

<script setup name="DeepChildren">
let testInput = ref('')
</script>

<style scoped lang="scss"></style>
