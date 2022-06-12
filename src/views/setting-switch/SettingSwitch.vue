<template>
  <div class="scroll-y">
    <h3 class="mb-2">props operate demo of settings.js</h3>
    <div class="rowSS">
      <div class="mb-1">
        page layout related
        <div class="mt-2">
          sidebarLogo：
          <el-switch v-model="appStore.settings.sidebarLogo" />
        </div>
        <div class="mt-3">
          showNavbarTitle：
          <el-switch v-model="appStore.settings.showNavbarTitle" />
        </div>
        <div class="mt-3">
          ShowDropDown：
          <el-switch v-model="appStore.settings.ShowDropDown" />
        </div>
        <div class="mt-3">
          showHamburger：
          <el-switch v-model="appStore.settings.showHamburger" />
        </div>
        <div class="mt-3">
          showLeftMenu：
          <el-switch v-model="appStore.settings.showLeftMenu" />
        </div>
        <div class="mt-3">
          showTagsView：
          <el-switch v-model="appStore.settings.showTagsView" />
        </div>
        <div class="mt-3">
          showTopNavbar：
          <el-switch v-model="appStore.settings.showTopNavbar" />
        </div>
      </div>

      <div class="mb-1 ml-6">
        page animation related
        <div class="mt-2">
          mainNeedAnimation：places to "settings file" for setting
          <!-- <el-switch v-model="appStore.settings.mainNeedAnimation" />-->
        </div>
        <div class="mt-3">
          isNeedNprogress：
          <el-switch v-model="appStore.settings.isNeedNprogress" />
        </div>
      </div>
    </div>
    <div class="mt-2 mb-1">store.commit to change</div>
    <el-button type="primary" @click="testChangeSettings">testChangeSettings</el-button>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'

const settings = computed(() => {
  return appStore.settings || {}
})

const appStore = useAppStore()
const testChangeSettings = () => {
  appStore.M_settings({ sidebarLogo: !settings.value.sidebarLogo })
}

const source = ref(false)
const sourceFun = () => {
  source.value = !source.value
}
const handle = () => {
  new Promise((resolve, reject) => {
    reject('reject promise')
  }).then((res) => {
    console.log('ok')
  })
}

const flag = ref(null)

const consoleErrorFun = () => {
  console.error('console.error')
}

const normalError = () => {
  throw new Error(' throw new Error("")\n')
}
const { proxy } = getCurrentInstance()
const updateReq = () => {
  return proxy
    .$axiosReq({
      // baseURL: 'https://github.jzfai.top/micro-service-test',
      url: '/integration-front/brand/updateBy',
      data: { id: 'fai' },
      method: 'put',
      isParams: true,
      bfLoading: true
    })
    .then(() => {})
  // .catch((err) => {
  //   console.log('接口catch', err)
  // })
}
</script>

<style scoped lang="scss"></style>
