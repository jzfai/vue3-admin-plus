<template>
  <!-- 添加或修改部门管理配置对话框 -->
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
    <el-form ref="deptRef" :model="addEditForm" label-width="80px">
      <el-form-item label="上级部门" prop="parentId" :rules="formRules.isNotNull('上级部门不能为空')">
        <el-tree-select
          v-model="addEditForm.parentId"
          :data="deptOptions"
          :props="{ value: 'deptId', label: 'deptName', children: 'children' }"
          value-key="deptId"
          placeholder="选择上级部门"
          check-strictly
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName" :rules="formRules.isNotNull('部门名称不能为空')">
        <el-input v-model="addEditForm.deptName" class="wi-150px" placeholder="部门名称" />
      </el-form-item>
      <el-form-item label="显示排序" prop="orderNum" :rules="formRules.isNotNull('显示排序不能为空')">
        <el-input v-model="addEditForm.orderNum" class="wi-150px" placeholder="显示排序" />
      </el-form-item>
      <el-form-item label="负责人" prop="leader" :rules="formRules.notValid('负责人不能为空')">
        <el-input v-model="addEditForm.leader" class="wi-150px" placeholder="负责人" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :rules="formRules.notValid('邮箱不能为空')">
        <el-input v-model="addEditForm.email" class="wi-150px" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="联系电话" :rules="formRules.notValid('请选择联系电话')">
        <el-input v-model="addEditForm.phone" class="wi-150px" placeholder="联系电话" />
      </el-form-item>
      <el-form-item label="部门状态" :rules="formRules.isNotNull('请选择部门状态')">
        <el-radio-group v-model="addEditForm.status">
          <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
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
import { addDept, getDept, updateDept } from '@/api/dept'
import { useDict } from '@/hooks/use-dict'
import { resetData, reshowData } from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const deptRef = ref('')
const open = ref(false)
const title = ref('新增部门管理')
const emits = defineEmits([])
// eslint-disable-next-line camelcase
const { listClassOptions, sys_normal_disable } = useDict('listClassOptions', 'sys_normal_disable')
const addEditForm = reactive({
  parentId: '',
  deptId: '',
  deptName: '',
  orderNum: '',
  leader: '',
  email: '',
  phone: '',
  status: '0'
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  deptRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.deptId !== '') {
        updateDept(addEditForm).then(() => {
          ElMessage({ message: '修改成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      } else {
        addDept(addEditForm).then(() => {
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
const deptOptions = ref()
const showModal = (row, deptList) => {
  if (row.parentId) {
    addEditForm.parentId = row.parentId
  }
  if (row.id) {
    getDept(row.id).then(({ data }) => {
      reshowData(addEditForm, data)
      //edit modal
      title.value = '编辑部门管理'
    })
  }
  deptOptions.value = deptList
  title.value = '新增部门管理'
  open.value = true
}
onMounted(() => {})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
