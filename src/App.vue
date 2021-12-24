<template>
  <router-view />
  <div v-if="settings.showVersionInfo" class="show-version-container">
    {{ showVersionInfo }}
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import packageJson from '../package.json'
import { useStore } from 'vuex'
const store = useStore()
let settings = computed(() => {
  return store.state.app.settings
})
import { setToken } from '@/utils/auth'
onBeforeMount(() => {
  //set tmp token when setting isNeedLogin false
  if (!settings.value.isNeedLogin) setToken(settings.value.tmpToken)
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
  opacity: 0.25;
}
</style>
