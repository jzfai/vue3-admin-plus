<template>
  <el-dropdown trigger="click" type="primary" @command="handleSetLang">
    <svg-icon icon-class="language" style="width: 20px; height: 20px" class="mr-20px" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          <h3 class="pt-10px pb-10px font-langPx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { storeToRefs } from 'pinia/dist/pinia'
import { useRoute } from 'vue-router'
import SvgIcon from '@/icons/SvgIcon.vue'
import { useConfigStore } from '@/store/config'
const state = reactive({
  langOptions: [
    { label: '中文', value: 'zh' },
    { label: 'English', value: 'en' }
  ]
})
const configStore = useConfigStore()
const { language } = storeToRefs(configStore)
const route = useRoute()
const handleSetLang = (lang) => {
  //refresh i18n
  configStore.setLanguage(lang, route.meta?.title)
}
const { langOptions } = toRefs(state)
</script>

<style scoped lang="scss"></style>
