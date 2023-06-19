<template>
  <div class="imgUpContainer rowSS">
    <!--图片列表-->
    <div class="imgShowList rowSS">
      <div v-for="(item, index) in imageList" :key="index" class="imgItem">
        <!--右上角删除按钮-->
        <el-icon class="rightDel" @click="deleteImage(index)">
          <CloseBold/>
        </el-icon>
        <img class="imgStyle" :src="item.url"/>
        <div class="imageName">{{ item.name }}</div>
      </div>
    </div>
    <!--图片上传-->
    <div class="packingImageContainer columnCC" style="cursor: pointer">
      <el-icon class="packingIconStyle" >
        <Plus/>
      </el-icon>
      <input
          ref="refSettingFile"
          type="file"
          class="inputStyle"
          accept=".jpg,.png,.jpeg,.doc,.xls,.ppt,.txt,.pdf"
          multiple
          @change="fileOnChange"
      />
    </div>
  </div>
  <!--  上传提示  -->
  <div class="el-upload__tip">
    <div>请上传 大小不超过 5MB 格式为 doc/xls/ppt/txt/pdf/png/jpg/jpeg 的文件</div>
  </div>
</template>

<script setup>
import {Plus, CloseBold} from '@element-plus/icons-vue'
import axiosReq from '@/utils/axios-req'
import {watermark} from './imgDillUtils'
import {ElMessage} from 'element-plus'
import {reactive, ref} from 'vue'

const imageList = ref([])

const fileOnChange = () => {
  const length = imageList.value.length
  if (length >= 5) {
    ElMessage({message: '文件上传数不能大于2个', type: 'warning'})
    return
  }
  const fileObj = refSettingFile.value.files
  const fileArr = Object.values(fileObj)
  if (fileArr.length) {
    fileArr.forEach((fItem) => {
      watermark(fItem, ['真香定律']).then((res) => {
        const formData = new FormData()
        formData.append('file', res)
        fileUploadSave(formData,fItem.name)
      })
    })
  }
}
const refSettingFile = ref(null)
const fileUploadSave = (formData) => {
  axiosReq({
    url: '/system/oss/upload',
    data: formData,
    method: 'post',
  }).then(({data}) => {
    // filename
    imageList.value.push({
      url:data.url,
      name: data.fileName
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
