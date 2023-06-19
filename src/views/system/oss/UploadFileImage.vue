<template>
  <el-dialog
    v-model="open"
    :title="title"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    width="600px"
    append-to-body
    @close="cancel"
  >
    <el-form ref="form" :model="addEditForm" label-width="80px">
      <el-form-item label="" :rules="formRules.isNotNull('文件名称不能为空')">
        <FileUpload ref="refFileUpload" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <!--<el-button type="primary" @click="submitForm">确 定</el-button>-->
        <el-button @click="cancel" type="primary">关 闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { addPlatform, getPlatform, updatePlatform } from '@/api/platform'
import { resetData, reshowData } from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const platformRef = ref('')
const open = ref(false)
const title = ref('上传图片')
const emits = defineEmits([])
const uploadType = ref(0)
const addEditForm = reactive({
  id: '',
  file: ''
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  platformRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.id !== '') {
        updatePlatform(addEditForm).then(() => {
          ElMessage({ message: '修改成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      } else {
        addPlatform(addEditForm).then(() => {
          ElMessage({ message: '新增成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      }
    }
  })
}
/** 取消按钮 */
const cancel = () => {
  open.value = false
  resetData(addEditForm, formString)
  emits('getList')
}
const showModal = ({ type }) => {
  console.log(type)
  title.value = '上传文件图片'
  uploadType.value = type
  open.value = true
}
onMounted(() => {})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
