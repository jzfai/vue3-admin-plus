<template>
  <el-config-provider :locale="lang[appStore.language]" :size="appStore.size" namespace="el">
    <router-view />
  </el-config-provider>
</template>
<script setup>
//lang and size config
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

import { setToken } from '@/utils/auth'

import { useAppStore } from '@/store/app'
const appStore = useAppStore()

let lang = { zh, en }

onBeforeMount(() => {
  //set tmp token when setting isNeedLogin false
  if (!appStore.settings.isNeedLogin) setToken(appStore.settings.tmpToken)
})
</script>
