<template>
  <div>
    <div class="mb-2">
      选择测试
      <LangSelect />
    </div>
    <div>{{ t(`route.Dashboard`) }}</div>
  </div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect/index.vue'
import { useI18n } from 'vue-i18n'
const { t, te } = useI18n({ useScope: 'global' })
</script>

<style scoped lang="scss"></style>
