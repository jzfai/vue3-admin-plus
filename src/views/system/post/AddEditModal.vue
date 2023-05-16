<template>
  <!-- 添加或修改岗位管理配置对话框 -->
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
    <el-form ref="postRef" :model="addEditForm" label-width="80px">
      <el-form-item label="岗位名称" prop="postName" :rules="formRules.isNotNull('岗位名称不能为空')">
        <el-input v-model="addEditForm.postName" class="wi-150px" placeholder="岗位名称" />
      </el-form-item>
      <el-form-item label="岗位编码" prop="postCode" :rules="formRules.isNotNull('岗位编码不能为空')">
        <el-input v-model="addEditForm.postCode" class="wi-150px" placeholder="岗位编码" />
      </el-form-item>
      <el-form-item label="岗位顺序" prop="postSort" :rules="formRules.isNotNull('岗位顺序不能为空')">
        <el-input v-model="addEditForm.postSort" class="wi-150px" placeholder="岗位顺序" />
      </el-form-item>
      <el-form-item label="备注" prop="remark" :rules="formRules.notValid('备注不能为空')">
        <el-input v-model="addEditForm.remark" class="wi-150px" placeholder="备注" />
      </el-form-item>
      <el-form-item label="岗位状态" :rules="formRules.isNotNull('请选择岗位状态')">
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
import { addPost, getPost, updatePost } from '@/api/post'
import { useDict } from '@/hooks/use-dict'
import { resetData, reshowData } from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const postRef = ref('')
const open = ref(false)
const title = ref('新增岗位管理')
const emits = defineEmits([])
// eslint-disable-next-line camelcase
const { sys_normal_disable } = useDict('sys_normal_disable')
const addEditForm = reactive({
  postId: '',
  postName: '',
  postCode: '',
  postSort: '',
  remark: '',
  status: ''
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  postRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.postId !== '') {
        updatePost(addEditForm).then(() => {
          ElMessage({ message: '修改成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      } else {
        addPost(addEditForm).then(() => {
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
    getPost(row.id).then(({ data }) => {
      reshowData(addEditForm, data)
      //edit modal
      title.value = '编辑岗位管理'
    })
  }
  title.value = '新增岗位管理'
  open.value = true
}
onMounted(() => {})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
