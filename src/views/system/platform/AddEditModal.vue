<template>
  <!-- 添加或修改平台配置对话框 -->
  <el-dialog
    v-model="open"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :title="title"
    width="600px"
    append-to-body
    @close="cancel"
  >
    <el-form ref="platformRef" :model="addEditForm" label-width="80px">
      <el-form-item label="平台名称" prop="name" :rules="formRules.isNotNull('平台名称不能为空')">
        <el-input v-model="addEditForm.name" class="wi-150px" placeholder="平台名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { addPlatform, getPlatform, updatePlatform } from '@/api/platform'
import { useDict } from '@/hooks/use-data-dict'
import { resetData, reshowData } from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const platformRef = ref('')
const open = ref(false)
const title = ref('新增平台')
const emits = defineEmits([])
const addEditForm = reactive({
  id: '',
  name: ''
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
}
const showModal = (row) => {
  if (row.id) {
    getPlatform(row.id).then(({ data }) => {
      reshowData(addEditForm, data)
      //edit modal
      title.value = '编辑平台'
    })
  }
  title.value = '新增平台'
  open.value = true
}
onMounted(() => {})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
