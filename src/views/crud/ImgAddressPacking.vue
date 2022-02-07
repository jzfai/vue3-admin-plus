<template>
  <div class="scroll-y">
    <div class="mt-2 mb-2">image upload and Add watermark</div>
    <div class="imgUpContainer rowSS">
      <!--图片列表-->
      <div class="imgShowList rowSS">
        <div v-for="(item, index) in imageList" :key="index" class="imgItem">
          <!--右上角删除按钮-->
          <el-icon class="rightDel" @click="deleteImage(index)"><CloseBold /></el-icon>
          <img class="imgStyle" :src="item.url" />
          <div class="imageName">{{ item.name }}</div>
        </div>
      </div>
      <!--图片上传-->
      <div class="packingImageContainer columnCC">
        <el-icon class="packingIconStyle"><Plus /></el-icon>
        <input
          ref="refSettingFile"
          type="file"
          class="inputStyle"
          accept=".jpg, .png"
          multiple
          @change="fileOnChange"
        />
      </div>
    </div>
    <div class="mt-2 mb-1">Provinces and cities packing</div>
    <el-cascader v-model="addressArr" :options="regionData" class="widthPx-200" @change="casHandle"></el-cascader>

    <div class="mt-2 mb-1">axios req cancel test(you need setting: Network->slow 3G To Test)</div>
    <el-button type="primary" @click="testAxiosCancelReq">emit req</el-button>
    <el-button type="primary" @click="cancelReq">cancel req</el-button>
  </div>
</template>

<script setup>
import { Plus, CloseBold } from '@element-plus/icons-vue'
import axiosReq from '@/utils/axiosReq.js'
import { watermark } from '@/views/crud/imgDillUtils.js'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
let imageList = ref([])

const fileOnChange = () => {
  let length = imageList.value.length
  if (length >= 5) {
    ElMessage({ message: '文件上传数不能大于2个', type: 'warning' })
    return
  }
  let fileObj = refSettingFile.value.files
  const fileArr = Object.values(fileObj)
  if (fileArr.length) {
    fileArr.forEach((fItem) => {
      watermark(fItem, ['真香定律']).then((res) => {
        const formData = new FormData()
        formData.append('file', res)
        fileUploadSave(formData)
      })
    })
  }
}
const refSettingFile = ref(null)
const fileUploadSave = (formData) => {
  axiosReq({
    url: '/ty-example/upload/file',
    data: formData,
    method: 'post',
    bfLoading: true,
    isUploadFile: true
  }).then((res) => {
    let { path } = res.data
    // filename
    let filename = refSettingFile.value.value
    filename = filename.slice(filename.lastIndexOf('\\') + 1)
    imageList.value.push({
      url: `${import.meta.env.VITE_APP_IMAGE_URL}/${path}`,
      name: filename
    })
  })
  refSettingFile.value.value = ''
}

const deleteImage = (index) => {
  imageList.value.splice(index, 1)
}

/*省市区选择器相关*/
//https://www.npmjs.com/package/element-china-area-data
import { TextToCode, CodeToText, regionData } from 'element-china-area-data'
let addressArr = reactive([])
const casHandle = (dataArr) => {
  console.log(CodeToText[addressArr[0]], CodeToText[addressArr[1]], CodeToText[addressArr[2]])
}

/*axios请求取消测试*/
const testAxiosCancelReq = () => {
  axiosReq({
    url: '/integration-front/user/getUserInfo',
    method: 'post',
    bfLoading: true,
    isAlertErrorMsg: false
  })
}
const cancelReq = () => {
  //cancel all req when page switch
  if (window.__axiosPromiseArr) {
    window.__axiosPromiseArr.forEach((ele, ind) => {
      ele.cancel()
      delete window.__axiosPromiseArr[ind]
    })
  }
}
</script>

<style scoped lang="scss">
$packingWidth: 200px;
$borderRadius: 6px;
.imgUpContainer {
}
.imgShowList {
  .imgItem {
    margin-right: 6px;
    position: relative;
    .imgStyle {
      border-radius: $borderRadius;
      width: $packingWidth;
      height: $packingWidth;
    }
    .imageName {
      width: $packingWidth;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .rightDel {
      background-color: #eee;
      border-radius: 14px;
      position: absolute;
      font-size: 16px;
      top: 1px;
      right: 1px;
      cursor: pointer;
    }
    .rightDel:hover {
      background-color: #999;
    }
  }
}
//图片上传
.packingImageContainer {
  position: relative;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: $borderRadius;
  box-sizing: border-box;
  width: $packingWidth;
  height: $packingWidth;
  cursor: pointer;

  .packingIconStyle {
    font-size: 30px;
  }
  .inputStyle {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: $packingWidth;
    height: $packingWidth;
  }
}
</style>
