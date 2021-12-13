<template>
  <div class="scroll-y">
    <div class="mt-2 mb-2">image upload and Add watermark</div>
    <div class="imgUpContainer rowSS">
      <!--图片列表-->
      <div class="imgShowList rowSS">
        <div class="imgItem" v-for="(item, index) in imageList" :key="index">
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
  </div>
</template>

<script setup>
import { Plus, CloseBold } from '@element-plus/icons-vue'
import axiosReq from '@/utils/axiosReq.js'
import { watermark } from '@/views/crud/imgDillUtils.js'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
let imageList = ref([])
const refSettingFile = ref(null)
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

const fileUploadSave = (formData) => {
  axiosReq({
    url: '/ty-upload/upload/image',
    data: formData,
    method: 'post',
    bfLoading: true,
    isUploadFile: true
  }).then((res) => {
    let { shortPath } = res.data
    // 存储文件名称
    let filename = refSettingFile.value.value
    filename = filename.slice(filename.lastIndexOf('\\') + 1)
    imageList.value.push({
      url: `${import.meta.env.VITE_APP_IMAGE_URL}/${shortPath}`,
      name: filename
    })
  })
  refSettingFile.value.value = ''
}

const deleteImage = (index) => {
  imageList.value.splice(index, 1)
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
