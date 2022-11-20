<template>
  <el-config-provider :locale="lang[language]" namespace="el" :size="size">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
//element-plus lang
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { storeToRefs } from 'pinia/dist/pinia'
import { useBasicStore } from '@/store/basic'
import { useConfigStore } from '@/store/config'
import { useErrorLog } from '@/hooks/use-error-log'
const lang = { zh, en }

const { settings } = storeToRefs(useBasicStore())
const { size, language } = storeToRefs(useConfigStore())
onBeforeMount(() => {
  //set tmp token when setting isNeedLogin false
  if (!settings.value.isNeedLogin) useBasicStore().setToken(settings.value.tmpToken)
})
onMounted(() => {
  //lanch the errorLog collection
  useErrorLog()
})
</script>
<style lang="scss">
//修改进度条样式
#nprogress .bar {
  background: var(--pregress-bar-color) !important;
}
</style>
