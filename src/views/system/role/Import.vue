<template>
  <!-- 用户导入对话框 -->
  <el-dialog v-model="isShow" :title="title" width="400px" append-to-body>
    <el-upload
      ref="uploadRef"
      :file-list="fileList"
      :limit="1"
      accept=".xlsx, .xls"
      :auto-upload="false"
      drag
      :on-remove="uploadOnRemove"
      :on-change="uploadOnChange"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip text-center">
          <div class="el-upload__tip">
            <el-checkbox v-model="updateSupport" />
            是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="downloadTemplate"
          >
            下载模板
          </el-link>
        </div>
      </template>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="isShow = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { downLoadTemp } from '@/hooks/use-common'
const isShow = ref(false)
const title = ref('上传文件')
import { downloadTemplateReq, importReq } from '@/api/role'
//提交按钮
const fileList = ref([])
const updateSupport = ref(false)
const submitFileForm = () => {
  const formData = new FormData()
  fileList.value.forEach((fItem) => {
    formData.append('file', fItem.raw)
  })
  importReq(formData).then(({ msg }) => {
    elConfirm('提示', msg)
    resetModal()
  })
}

//重置modal
const resetModal = () => {
  fileList.value = []
  isShow.value = false
}

//上传文件
const uploadOnRemove = (uploadFile, uploadFiles) => {
  fileList.value = uploadFiles
}
const uploadOnChange = (uploadFile, uploadFiles) => {
  fileList.value = uploadFiles
}
//显示modal
const showModal = () => {
  isShow.value = true
}
//下载模板
const downloadTemplate = () => {
  downloadTemplateReq().then((res) => {
    downLoadTemp(res)
  })
}

defineExpose({ showModal })
</script>

<style scoped lang="scss"></style>
