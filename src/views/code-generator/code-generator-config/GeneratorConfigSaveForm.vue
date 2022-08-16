<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="60vw"
    :close-on-click-modal="false"
    :before-close="closeFormModal"
  >
    <el-form ref="refForm" label-width="150px" :inline="false" :model="subForm" :rules="formRules" class="pr-5">
      <el-form-item label="选中的字段配置" prop="name" :rules="formRules.isNotNull">
        <el-input v-model="subForm.name" style="width: 120px" placeholder="选中的字段配置" />
      </el-form-item>
      <el-form-item label="生成的配置" prop="generatorConfig" :rules="formRules.isNotNull">
        <el-input v-model="subForm.generatorConfig" style="width: 120px" placeholder="生成的配置" />
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
defineOptions({ name: 'GeneratorConfigSaveForm' })
const emit = defineEmits(['selectPageReq', 'hideComp'])
const { formRules, elMessage } = useElement()
/*2.modal新增和修改*/
//新增
let subForm = reactive({ id: '', name: '', generatorConfig: '' })
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
    url: '/integration-front/generatorConfigSave/insert',
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
    url: '/integration-front/generatorConfigSave/updateById',
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
    dialogTitle = `编辑【配置】`
    dialogVisible = true
    reshowData(detailData)
  } else {
    dialogTitle = '添加【配置】'
    dialogVisible = true
  }
}
//关闭弹框
let closeFormModal = () => {
  emit('hideComp')
}
onMounted(() => {})
//导出给refs使用
defineExpose({ showModal })
</script>

<style scoped="scoped" lang="scss"></style>
