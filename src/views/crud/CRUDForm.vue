<template>
  <el-dialog
    v-model="dialogVisibleMixin"
    :title="dialogTitleMixin"
    width="50vw"
    :close-on-click-modal="false"
    :before-close="closeFormModal"
  >
    <el-form ref="refForm" label-width="150px" :inline="false" :model="subForm" :rules="formRulesMixin" class="pr-5">
      <el-form-item label="品牌名称" prop="name" :rules="formRulesMixin.isNotNull" label-position="left">
        <el-input v-model="subForm.name" class="widthPx-150" placeholder="品牌名称" />
      </el-form-item>
      <el-form-item label="品牌图片地址" prop="image" :rules="formRulesMixin.isNotNull" label-position="left">
        <div class="rowSE">
          <img v-if="subForm.image" :src="subForm.image" class="widthPx-120 heightPx-120 border_radius5" />
          <div :class="[subForm.image && 'ml-1']" class="rowSS">
            <el-button type="primary" @click="goUploadFileMixin">
              <i class="el-icon-upload2" />
              上传
              <input
                id="uploadFile"
                ref="refSettingFile"
                type="file"
                ccept=".png, .jpg"
                style="display: none"
                @change="fileUploadSave"
              />
            </el-button>
            <div class="ml-1">{{ chooseFileNameMixin }}</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="品牌的首字母" prop="letter" :rules="formRulesMixin.isNotNull" label-position="left">
        <el-input v-model="subForm.letter" maxlength="1" class="widthPx-150" placeholder="品牌的首字母" />
      </el-form-item>
      <el-form-item label="排序" prop="seq" :rules="formRulesMixin.isNotNull" label-position="left">
        <el-input v-model="subForm.seq" class="widthPx-150" placeholder="排序" />
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

<script setup>
/*1.初始化引入和实例化*/
import { getCurrentInstance, ref, reactive } from 'vue'
let { proxy } = getCurrentInstance()
const emit = defineEmits(['selectPageReq', 'hideComp'])
/*2.modal新增和修改*/
//新增
let subForm = reactive({
  id: '',
  name: '',
  image: '',
  letter: '',
  seq: ''
})
const refForm = ref(null)
let confirmBtnClick = () => {
  refForm.value.validate((valid) => {
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
  proxy
    .$axiosReq({
      url: '/integration-front/brand/insert',
      data: data,
      method: 'post', //--c
      bfLoading: true
    })
    .then(() => {
      proxy.elMessageMixin('保存成功')
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
let updateReq = () => {
  return proxy
    .$axiosReq({
      url: '/integration-front/brand/updateById',
      data: subForm,
      method: 'put',
      bfLoading: true
    })
    .then(() => {
      proxy.elMessageMixin('更新成功')
      emit('selectPageReq')
      emit('hideComp')
    })
}

/*3.弹框相关*/
//显示弹框
let showModal = (isEdit, detailData) => {
  if (isEdit) {
    proxy.dialogTitleMixin = `编辑【${detailData.name}】`
    proxy.dialogVisibleMixin = true
    reshowData(detailData)
  } else {
    proxy.dialogTitleMixin = '添加【brand】'
    proxy.dialogVisibleMixin = true
  }
}
//关闭弹框
let closeFormModal = () => {
  emit('hideComp')
}

/*4.上传文件相关*/
const fileUploadSave = () => {
  const formData = new FormData()
  formData.append('file', proxy.$refs.refSettingFile.files[0])
  proxy
    .$axiosReq({
      url: '/ty-example/upload/file',
      timeout: 30000,
      data: formData,
      method: 'post',
      bfLoading: true,
      isUploadFile: true
    })
    .then((resData) => {
      let { path } = resData.data
      proxy.chooseFileNameMixin = path
      // 存储文件名称
      const filename = proxy.$refs.refSettingFile.value
      proxy.chooseFileNameMixin = filename.slice(filename.lastIndexOf('\\') + 1)
      subForm.image = `${import.meta.env.VITE_APP_IMAGE_URL}/${path}`
      proxy.$refs.refSettingFile.value = ''
    })
    .catch(() => {
      proxy.chooseFileNameMixin = ''
      subForm.image = ''
      proxy.$refs.refSettingFile.value = ''
    })
}

//导出给refs使用
defineExpose({
  showModal
})

//导出属性到页面中使用
// let {levelList} = toRefs(state);
</script>

<style scoped lang="scss"></style>
