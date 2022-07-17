<template>
  <el-config-provider :locale="locale" :size="size" namespace="el">
    <router-view />
  </el-config-provider>
</template>
<script setup>
import { setToken } from '@/utils/auth'
import { useAppStore } from '@/store/app'

//get settings
const appStore = useAppStore()
const settings = computed(() => {
  return appStore.settings
})
//lang and size config
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en' // element-ui lang
let lang = { zh, en }
let size = $ref(localStorage.getItem('size') || settings.value.defaultSize)
let locale = $ref(lang[localStorage.getItem('language') || settings.value.defaultLanguage])

onBeforeMount(() => {
  //set tmp token when setting isNeedLogin false
  if (!settings.value.isNeedLogin) setToken(settings.value.tmpToken)
})
</script>
