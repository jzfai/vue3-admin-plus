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
      <el-form-item label="字典类型" prop="dictType" :rules="formRules.isNotNull('字典类型不能为空')">
        <el-input v-model="addEditForm.dictType" disabled class="wi-150px" placeholder="字典类型" />
      </el-form-item>
      <el-form-item label="数据标签" prop="dictLabel" :rules="formRules.isNotNull('数据标签不能为空')">
        <el-input v-model="addEditForm.dictLabel" class="wi-150px" placeholder="数据标签" />
      </el-form-item>
      <el-form-item label="数据键值" prop="dictValue" :rules="formRules.isNotNull('数据键值不能为空')">
        <el-input v-model="addEditForm.dictValue" class="wi-150px" placeholder="数据键值" />
      </el-form-item>
      <el-form-item label="样式属性" prop="cssClass" :rules="formRules.notValid('样式属性不能为空')">
        <el-input v-model="addEditForm.cssClass" class="wi-150px" placeholder="样式属性" />
      </el-form-item>
      <el-form-item label="显示排序" prop="dictSort">
        <el-input-number v-model="addEditForm.dictSort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="回显样式" prop="listClass">
        <el-select v-model="addEditForm.listClass">
          <el-option
            v-for="item in listClassOptions"
            :key="item.value"
            :label="item.label + '(' + item.value + ')'"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :rules="formRules.isNotNull('请选择状态')">
        <el-select v-model="addEditForm.status" placeholder="状态" class="wi-150px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :rules="formRules.notValid('备注不能为空')">
        <el-input v-model="addEditForm.remark" class="wi-150px" placeholder="备注" />
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
import { addDict, getDict, updateDict } from '@/api/dictData'
import { useDict } from '@/hooks/use-data-dict'
import { resetData, reshowData } from '@/hooks/use-common'
import { getQueryParam } from '@/hooks/use-self-router.ts'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const dictRef = ref('')
const open = ref(false)
const title = ref('新增数据字典')
const emits = defineEmits([])
// eslint-disable-next-line camelcase
const { sys_normal_disable } = useDict(['listClassOptions', 'sys_normal_disable'])
const addEditForm = reactive({
  id:"",
  dictType: '',
  dictLabel: '',
  dictValue: '',
  cssClass: '',
  dictCode: '',
  dictSort: '',
  listClass: 'default',
  status: 0,
  remark: ''
})
// 数据标签回显样式
const listClassOptions = ref([
  { value: 'default', label: '默认' },
  { value: 'primary', label: '主要' },
  { value: 'success', label: '成功' },
  { value: 'info', label: '信息' },
  { value: 'warning', label: '警告' },
  { value: 'danger', label: '危险' }
])
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  dictRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.dictCode !== '') {
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
  if (row.dictCode) {
    getDict(row.dictCode).then(({ data }) => {
      reshowData(addEditForm, data)
      //edit modal
      title.value = '编辑数据字典'
    })
  }else{
    addEditForm.dictType=row.dictType
  }
  title.value = '新增数据字典'
  open.value = true
}
onMounted(() => {})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
