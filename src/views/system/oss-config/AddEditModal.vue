<template>
  <!-- 添加或修改oss配置配置对话框 -->
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
    <el-form ref="ossConfigRef" :model="addEditForm" label-width="100px">
      <el-form-item label="配置key" prop="configKey" :rules="formRules.isNotNull('配置key不能为空')">
        <el-input v-model="addEditForm.configKey" class="wi-150px" placeholder="配置key" />
      </el-form-item>
      <el-form-item label="访问站点" prop="endpoint" :rules="formRules.isNotNull('访问站点不能为空')">
        <el-input v-model="addEditForm.endpoint" class="wi-150px" placeholder="访问站点" />
      </el-form-item>
      <el-form-item label="自定义域名" prop="domain">
        <el-input v-model="addEditForm.domain" class="wi-150px" placeholder="自定义域名" />
      </el-form-item>
      <el-form-item label="accessKey" prop="accessKey" :rules="formRules.isNotNull('accessKey不能为空')">
        <el-input v-model="addEditForm.accessKey" class="wi-150px" placeholder="accessKey" />
      </el-form-item>
      <el-form-item label="秘钥" prop="secretKey" :rules="formRules.isNotNull('秘钥不能为空')">
        <el-input v-model="addEditForm.secretKey" class="wi-150px" placeholder="秘钥" />
      </el-form-item>
      <el-form-item label="桶名称" prop="bucketName" :rules="formRules.isNotNull('桶名称不能为空')">
        <el-input v-model="addEditForm.bucketName" class="wi-150px" placeholder="桶名称" />
      </el-form-item>
      <el-form-item label="前缀" prop="prefix">
        <el-input v-model="addEditForm.prefix" class="wi-150px" placeholder="前缀" />
      </el-form-item>
      <el-form-item label="是否https" prop="isHttps">
        <el-radio-group v-model="addEditForm.isHttps">
          <el-radio label="Y">是</el-radio>
          <el-radio label="N">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="桶权限类型" prop="accessPolicy">
        <el-radio-group v-model="addEditForm.accessPolicy">
          <el-radio :label="0">private</el-radio>
          <el-radio :label="1">public</el-radio>
          <el-radio :label="2">custom</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="域" prop="region" :rules="formRules.notValid('域不能为空')">
        <el-input v-model="addEditForm.region" class="wi-150px" placeholder="域" />
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
import { addOssConfig, getOssConfig, updateOssConfig } from '@/api/ossConfig'
import { resetData, reshowData } from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const ossConfigRef = ref('')
const open = ref(false)
const title = ref('新增oss配置')
const emits = defineEmits([])

const addEditForm = reactive({
  ossConfigId: '',
  configKey: '',
  endpoint: '',
  domain: '',
  accessKey: '',
  secretKey: '',
  bucketName: '',
  prefix: '',
  isHttps: 'N',
  accessPolicy: 1,
  region: '',
  remark: ''
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  ossConfigRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.ossConfigId !== '') {
        updateOssConfig(addEditForm).then(() => {
          ElMessage({ message: '修改成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      } else {
        addOssConfig(addEditForm).then(() => {
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
    getOssConfig(row.id).then(({ data }) => {
      reshowData(addEditForm, data)
      //edit modal
      title.value = '编辑oss配置'
    })
  }
  title.value = '新增oss配置'
  open.value = true
}
onMounted(() => {})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
