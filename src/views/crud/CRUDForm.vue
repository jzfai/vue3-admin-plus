<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="60vw"
    :close-on-click-modal="false"
    :before-close="closeFormModal"
  >
    <el-form ref="refForm" label-width="150px" :inline="false" :model="subForm" :rules="formRules" class="pr-5">
      <el-form-item prop="name" :rules="formRules.isNotNull">
        <div class="rowSE">
          <img v-if="subForm.name" :src="subForm.name" class="widthPx-120 heightPx-120 border_radius5" />
          <div :class="[subForm.name && 'ml-1']" class="rowSS">
            <el-button type="primary" @click="goUploadFile">
              <i class="el-icon-upload2" />
              上传
              <input
                id="uploadFile"
                ref="refSettingFile"
                type="file"
                accept=".png, .jpg"
                style="display: none"
                @change="fileUploadSave"
              />
            </el-button>
            <div class="ml-1">{{ chooseFileName }}</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="品牌图片地址" prop="image" :rules="formRules.isNotNull">
        <el-input v-model="subForm.image" style="width: 120px" placeholder="品牌图片地址" />
      </el-form-item>
      <el-form-item label="品牌的首字母" prop="letter" :rules="formRules.isNotNull">
        <el-input v-model="subForm.letter" style="width: 120px" placeholder="品牌的首字母" />
      </el-form-item>
      <el-form-item label="排序" prop="seq" :rules="formRules.isNotNull">
        <el-input v-model="subForm.seq" style="width: 120px" placeholder="排序" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeFormModal">取 消</el-button>
        <el-button type="primary" @click="confirmBtnClick">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup="setup">
const emit = defineEmits(['selectPageReq', 'hideComp'])
const { formRules, elMessage } = useElement()
/*2.modal新增和修改*/
//新增
let subForm = reactive({ id: '', name: '', image: '', letter: '', seq: '' })
const refForm = $ref(null)
let confirmBtnClick = () => {
  refForm.validate((valid) => {
    if (valid) {
      if (subForm.id) {
        updateReq()
      } else {
        insertReq()
      }
    } else {
      return false
    }
  })
}
const insertReq = () => {
  const data = JSON.parse(JSON.stringify(subForm))
  delete data.id
  axiosReq({
    url: '/integration-front/brand/insert',
    data: data,
    method: 'post',
    bfLoading: true
  }).then(() => {
    elMessage('保存成功')
    emit('selectPageReq')
    emit('hideComp')
  })
}
//修改
const reshowData = (row) => {
  Object.keys(row).forEach((fItem) => {
    Object.keys(subForm).forEach((sItem) => {
      if (fItem === sItem) {
        subForm[sItem] = row[sItem]
      }
    })
  })
}
const updateReq = () => {
  return axiosReq({
    url: '/integration-front/brand/updateById',
    data: subForm,
    method: 'update',
    bfLoading: true
  }).then(() => {
    elMessage('更新成功')
    emit('selectPageReq')
    emit('hideComp')
  })
}

/*3.弹框相关*/
//显示弹框
let dialogTitle = $ref(null)
let dialogVisible = $ref(null)
let chooseFileName = $ref(null)
let showModal = (isEdit, detailData) => {
  if (isEdit) {
    dialogTitle = `编辑【品牌表】`
    dialogVisible = true
    reshowData(detailData)
  } else {
    dialogTitle = '添加【品牌表】'
    dialogVisible = true
  }
}
//关闭弹框
let closeFormModal = () => {
  emit('hideComp')
}
/*上传图片(单张))*/
const refSettingFile = $ref(null)
const goUploadFile = () => {
  refSettingFile.click()
}
const fileUploadSave = () => {
  const formData = new FormData()
  formData.append('file', refSettingFile.files[0])
  axiosReq({
    url: '/ty-example/upload/file',
    timeout: 30000,
    data: formData,
    method: 'post',
    bfLoading: true,
    isUploadFile: true
  })
    .then((resData) => {
      let { path } = resData.data
      const filename = refSettingFile.value
      chooseFileName = filename.slice(filename.lastIndexOf('\\') + 1)
      subForm.image = `${import.meta.env.VITE_APP_IMAGE_URL}/${path}`
      refSettingFile.value = ''
    })
    .catch(() => {
      chooseFileName = ''
      subForm.image = ''
      refSettingFile.value = ''
    })
}
onMounted(() => {})
//导出给refs使用
defineExpose({ showModal })
</script>

<style scoped="scoped" lang="scss"></style>
