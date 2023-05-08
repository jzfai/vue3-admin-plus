<template>
  <!-- 添加或修改数据字典配置对话框 -->
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
    <el-form ref="dictRef" :model="addEditForm" label-width="80px">
      <el-form-item label="字典名称" prop="dictName" :rules="formRules.isNotNull('字典名称不能为空')">
        <el-input v-model="addEditForm.dictName" class="wi-150px" placeholder="字典名称" />
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType" :rules="formRules.isNotNull('字典类型不能为空')">
        <el-input v-model="addEditForm.dictType" class="wi-150px" placeholder="字典类型" />
      </el-form-item>
      <el-form-item label="备注" prop="remark" :rules="formRules.notValid('备注不能为空')">
        <el-input v-model="addEditForm.remark" class="wi-150px" placeholder="备注" />
      </el-form-item>
      <el-form-item label="状态" :rules="formRules.isNotNull('请选择状态')">
        <el-select v-model="addEditForm.status" placeholder="状态" class="wi-150px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
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
import { addDict, getDict, updateDict } from '@/api/dict'
import { useDict } from '@/hooks/use-dict'
import { resetData, reshowData } from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const dictRef = ref('')
const open = ref(false)
const title = ref('新增数据字典')
const emits = defineEmits([])
// eslint-disable-next-line camelcase
const { sys_normal_disable } = useDict('sys_normal_disable')
const addEditForm = reactive({
  dictId: '',
  dictName: '',
  dictType: '',
  remark: '',
  status: ''
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  dictRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.dictId !== '') {
        updateDict(addEditForm).then(() => {
          ElMessage({ message: '修改成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      } else {
        addDict(addEditForm).then(() => {
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
    getDict(row.id).then(({ data }) => {
      reshowData(addEditForm, data)
      //edit modal
      title.value = '编辑数据字典'
    })
  }
  title.value = '新增数据字典'
  open.value = true
}
onMounted(() => {})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
