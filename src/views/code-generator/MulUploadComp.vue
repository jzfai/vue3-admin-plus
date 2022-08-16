<template>
  <div class="imgUpContainer rowSS">
    <!--图片列表-->
    <div class="imgShowList rowSS flex-wrap">
      <div v-for="(item, index) in uploadFileList" :key="index" class="imgItem">
        <!--右上角删除按钮-->
        <el-icon class="imgStyle"><Document class="imgStyle" /></el-icon>
        <el-icon class="rightDel" @click="deleteFile(index)"><CloseBold /></el-icon>
        <div class="imageName">{{ item.name }}</div>
      </div>
    </div>
    <!--图片上传-->
    <div class="rowSE">
      <div class="packingImageContainer columnCC">
        <el-icon class="packingIconStyle"><Plus /></el-icon>
        <input
          ref="refSettingFile"
          type="file"
          class="inputStyle"
          accept=".vm, .vue, .java, .py"
          multiple
          @change="fileOnChange"
        />
      </div>
      <el-button type="primary" class="ml-20px" :disabled="!uploadFileList.length" @click="uploadTheVmsTemp">
        上传
      </el-button>
    </div>
  </div>
</template>

<script setup>
let uploadFileList = $ref([])
import { Plus, CloseBold, Document } from '@element-plus/icons-vue'

import commonUtil from '@/utils/commonUtil'
const fileOnChange = () => {
  let fileObj = refSettingFile.files
  Object.values(fileObj).forEach((fItem) => {
    if (!commonUtil.findArrObjByKey(uploadFileList, 'name', fItem.name)) {
      uploadFileList.push(fItem)
    }
  })
  refSettingFile.value = ''
}

const emits = defineEmits(['uploadTheVmsTemp'])
const uploadTheVmsTemp = async () => {
  emits('uploadTheVmsTemp', uploadFileList)
}

const deleteFile = (index) => {
  uploadFileList.splice(index, 1)
}

const refSettingFile = $ref(null)
</script>

<style scoped lang="scss">
$packingWidth: 80px;
$borderRadius: 6px;
.imgUpContainer {
}
.imgShowList {
  .imgItem {
    margin-right: 10px;
    position: relative;
    .imgStyle {
      border-radius: $borderRadius;
      width: $packingWidth;
      height: $packingWidth;
    }
    .imageName {
      text-align: center;
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
