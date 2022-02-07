<template>
  <div class="scroll-y">
    <!--    <teleport to="body">-->
    <!--      <div>i come from ErrorLogTest.vue</div>-->
    <!--    </teleport>-->
    <div class="mt-2">throw unhandledrejection</div>
    <el-button type="primary" @click="handle">unhandledrejection</el-button>

    <div class="mt-2">throw console.error</div>
    <el-button type="primary" @click="consoleErrorFun">console.error</el-button>

    <div class="mt-2">throw normalError</div>
    <el-button type="primary" @click="normalError">normalError</el-button>

    <!--req relative-->
    <div class="mt-2">throw req cross origin</div>
    <el-button type="primary" @click="reqCrossOrigin">reqCrossOrigin</el-button>
    <div class="mt-2">throw req 404 error</div>
    <el-button type="primary" @click="req404">req404</el-button>
    <!-- resource load error   -->
    <div class="mt-2">throw image load error</div>
    <el-button type="primary" @click="errorLogImg">imageLoadError</el-button>
    <!--image load error demo-->
    <img v-if="imgShow" src="http://img.png" />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
let settings = computed(() => {
  return store.state.app.settings || {}
})

const testChangeSettings = () => {
  store.commit('app/M_settings', { sidebarLogo: !settings.value.sidebarLogo })
}

const handle = () => {
  new Promise((resolve, reject) => {
    reject('reject promise')
  }).then((res) => {
    console.log('ok')
  })
}

let flag = ref(null)

const consoleErrorFun = () => {
  console.error('console.error')
}

const normalError = () => {
  throw new Error(' throw new Error("")\n')
}
let reqCrossOrigin = () => {
  axiosReq({
    baseURL: 'http://8.135.1.141/micro-service-test',
    url: '/integration-front/brand/updateBy',
    data: { id: 'fai' },
    method: 'put',
    isParams: true,
    bfLoading: true
  }).then(() => {})
}

import axiosReq from '@/utils/axiosReq'
let req404 = () => {
  axiosReq({
    // baseURL: 'http://8.135.1.141/micro-service-test',
    url: '/integration-front/brand/updateBy1',
    data: { id: 'fai' },
    method: 'put',
    isParams: true,
    bfLoading: true
  }).then((res) => {})
  //the error will collection to unhandledrejection if you  no catch
  // .catch((err) => {})
}

//img loader err test
let imgShow = ref(false)
const errorLogImg = () => {
  imgShow.value = !imgShow.value
}
</script>

<style scoped lang="scss"></style>
