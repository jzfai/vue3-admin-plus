<template>
  <div id="CustomUploadVms">
    <div class="mt-4">自定义模板上传(确保已选择完数据源字段)</div>

    <div class="mt-3 mb-1 rowSS">
      <div>生成前端模版(多个模板一起上传,支持拖拽)</div>
      <el-button text type="danger" @click="downloadTmpFront">点击下载模版</el-button>
    </div>
    <MulUploadComp ref="refMulUploadComp" @uploadTheVmsTemp="uploadFrontTemp" />
    <div class="mt-3 mb-1 rowSS">
      <div>生成后端模版</div>
      <el-button text type="danger" @click="downloadTmpBack">点击下载模版</el-button>
    </div>
    <MulUploadComp ref="refMulUploadComp" @uploadTheVmsTemp="uploadBackTemp" />
    <div class="mt-3 mb-1">
      自定义生成模版（只提供数据源能力，导入的模版是什么则返回什么， 返回后会对模版里的插槽字段进行填充）
    </div>
    <MulUploadComp ref="refMulUploadComp" @uploadTheVmsTemp="uploadFrontAndBackTemp" />
  </div>
</template>

<script setup>
import MulUploadComp from './MulUploadComp.vue'

let { proxy } = getCurrentInstance()
const uploadFrontTemp = async (uploadFileList) => {
  let formData = new FormData()
  uploadFileList.forEach((fItem) => {
    formData.append('file', fItem)
  })
  //获取parent中的json数据
  let jsonData = await proxy.$parent.generatorSubData()
  formData.append('jsonData', JSON.stringify(jsonData))
  axiosReq({
    url: '/basis-func/generator/generatorFrontCustomTemp',
    data: formData,
    method: 'post',
    bfLoading: true,
    isUploadFile: true,
    isDownLoadFile: true
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', decodeURI(res.headers?.exportfilename))
    document.body.appendChild(link)
    link.click()
  })
}

/**
 *下载前端模版
 * @return
 * @author 熊猫哥
 * @date 2022/6/26 18:33
 */
const downloadTmpFront = () => {
  const link = document.createElement('a')
  link.href = 'https://github.jzfai.top/file/velocity-template/front-vms.zip'
  link.setAttribute('download', `front-vms.zip`)
  document.body.appendChild(link)
  link.click()
}
/**
 *下载后端模版
 * @return
 * @author 熊猫哥
 * @date 2022/6/26 18:33
 */
const downloadTmpBack = () => {
  const link = document.createElement('a')
  link.href = 'https://github.jzfai.top/file/velocity-template/back-vms.zip'
  link.setAttribute('download', `ack-vms.zip`)
  document.body.appendChild(link)
  link.click()
}

const uploadBackTemp = async (uploadFileList) => {
  let formData = new FormData()
  uploadFileList.forEach((fItem) => {
    formData.append('file', fItem)
  })
  //获取parent中的json数据
  let jsonData = await proxy.$parent.generatorSubData()
  formData.append('jsonData', JSON.stringify(jsonData))
  axiosReq({
    url: '/basis-func/generator/generatorBackCustomTemp',
    data: formData,
    method: 'post',
    bfLoading: true,
    isUploadFile: true,
    isDownLoadFile: true
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', decodeURI(res.headers?.exportfilename))
    document.body.appendChild(link)
    link.click()
  })
}
const uploadFrontAndBackTemp = async (uploadFileList) => {
  let formData = new FormData()
  uploadFileList.forEach((fItem) => {
    formData.append('file', fItem)
  })
  //获取parent中的json数据
  let jsonData = await proxy.$parent.generatorSubData()
  formData.append('jsonData', JSON.stringify(jsonData))
  axiosReq({
    url: '/basis-func/generator/generatorCustomTemp',
    data: formData,
    method: 'post',
    bfLoading: true,
    isUploadFile: true,
    isDownLoadFile: true
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', decodeURI(res.headers?.exportfilename))
    document.body.appendChild(link)
    link.click()
  })
}
</script>

<style scoped lang="scss"></style>
