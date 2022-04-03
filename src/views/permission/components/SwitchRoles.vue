<template>
  <div class="switchRoles">
    <div>
      <div style="margin-bottom: 15px">Your roles: {{ roles }}</div>
      Switch roles:
    </div>
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script setup>
//获取store和router

import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const roles = computed(() => {
  return userStore.roles
})
// const emit = defineEmits(['change'])
const switchRoles = computed({
  get() {
    return roles.value[0]
  },
  set(val) {
    const roles = [val]
    localStorage.setItem('roles', JSON.stringify(roles))
    location.reload()
  }
})
</script>

<style scoped lang="scss"></style>
