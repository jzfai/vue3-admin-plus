<template>
  <div class="dashboard-container scroll-y">
    <Admin v-if="roles.includes('admin')" />
    <Editor v-else />
  </div>
</template>

<script setup>
import Admin from './Admin'
import Editor from './Editor'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const roles = computed(() => {
  return store.state.user.roles
})
</script>

<style scoped lang="scss"></style>
