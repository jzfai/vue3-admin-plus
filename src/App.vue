<template>
  <router-view />
  <div class="show-version-container" v-if="settings.showVersionInfo">
    {{ showVersionInfo }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import packageJson from '../package.json'

import { useStore } from 'vuex'
const store = useStore()
let settings = computed(() => {
  return store.state.app.settings
})

const showVersionInfo = computed(() => {
  return `v${packageJson.version}-${GLOBAL_VAR.GIT_COMMIT_ID}`
})
</script>

<style scoped lang="scss">
.show-version-container {
  position: fixed;
  bottom: 6px;
  right: 6px;
  background: #fff;
  padding: 2px 2px;
  border-radius: 2px;
}
</style>
