<template>
  <div class="mockTest">
    <div>mock 使用示例(dev环境时使用)</div>
    <el-button type="primary" @click="listReq">点击发送mock请求</el-button>
  </div>
</template>

<script setup>
// mock address https://blog.csdn.net/weixin_42067720/article/details/115579817
// import '@/mock/index.js'
import axios from 'axios'
const listReq = () => {
  axios.get('/getMapInfo').then((res) => {
    if (res.data) {
      console.log(res.data)
      alert(res.data.title)
    }
  })
}
</script>

<style scoped lang="scss"></style>
