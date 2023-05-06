<template>
  <!-- 添加或修改用户配置对话框 -->
  <el-dialog
    v-model="open"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :title="title"
    width="650px"
    append-to-body
    @close="cancel"
  >
    <el-form ref="userRef" :model="addEditForm" label-width="100px" inline>
      <el-form-item label="用户昵称" prop="nickName" :rules="formRules.isNotNull('用户昵称不能为空')">
        <el-input v-model="addEditForm.nickName" style="width: 150px" placeholder="用户昵称" />
      </el-form-item>
      <el-form-item label="归属部门" prop="deptId" :rules="formRules.isNotNull('用户昵称不能为空')">
        <el-tree-select
          v-model="addEditForm.deptId"
          style="width: 150px !important"
          :data="deptIdOptions"
          :props="{ value: 'id', label: 'label', children: 'children' }"
          value-key="id"
          placeholder="请选择归属部门"
          check-strictly
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber" :rules="formRules.isNotNull('手机号码不能为空')">
        <el-input v-model="addEditForm.phonenumber" style="width: 150px" placeholder="手机号码" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :rules="formRules.isNotNull('邮箱不能为空')">
        <el-input v-model="addEditForm.email" style="width: 150px" placeholder="邮箱" />
      </el-form-item>
      <el-form-item
        v-if="!addEditForm.userId"
        label="用户名称"
        prop="userName"
        :rules="formRules.isNotNull('用户名称不能为空')"
      >
        <el-input v-model="addEditForm.userName" style="width: 150px" placeholder="用户名称" />
      </el-form-item>
      <el-form-item
        v-if="!addEditForm.userId"
        label="用户密码"
        prop="password"
        :rules="formRules.isNotNull('用户密码不能为空')"
      >
        <el-input v-model="addEditForm.password" style="width: 150px" placeholder="用户密码" />
      </el-form-item>
      <el-form-item label="用户性别" :rules="formRules.notValid('请选择用户性别')">
        <el-select v-model="addEditForm.sex" placeholder="用户性别" style="width: 150px">
          <el-option
            v-for="dict in sys_user_sex"
            :key="dict.value"
            style="width: 150px"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="岗位" :rules="formRules.notValid('请选择岗位')">
        <el-select v-model="addEditForm.postIds" multiple placeholder="岗位" style="width: 150px">
          <el-option
            v-for="item in postIdsOptions"
            :key="item.postId"
            :disabled="item.status == 1"
            :label="item.postName"
            :value="item.postId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" :rules="formRules.notValid('请选择角色')">
        <el-select v-model="addEditForm.roleIds" multiple placeholder="角色" style="width: 150px">
          <el-option
            v-for="item in roleIdsOptions"
            :key="item.roleId"
            :disabled="item.status == 1"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="备注" prop="remark" :rules="formRules.notValid('备注不能为空')">
          <el-input
            v-model="addEditForm.remark"
            type="textarea"
            maxlength="200"
            show-word-limit="show-word-limit"
            resize="none"
            style="width: 300px"
            rows="2"
            clearable="clearable"
            placeholder="请输入备注"
          />
        </el-form-item>
      </div>
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
import {addUser, deptIdReq, getUser, getUserInfo, updateUser} from '@/api/user'
import { useDict } from '@/hooks/use-dict'
import { resetData } from '@/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const userRef = ref('')
const open = ref(false)
const title = ref('新增用户')
const emits = defineEmits([])
// eslint-disable-next-line camelcase
const { sys_user_sex, sys_normal_disable } = useDict('sys_user_sex', 'sys_normal_disable')
const addEditForm = reactive({
  nickName: '',
  userId: "",
  deptId: '',
  phonenumber: '',
  email: '',
  userName: '',
  password: '',
  sex: '',
  status: '',
  postIds: '',
  roleIds: '',
  remark: ''
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  userRef.value.validate((valid) => {
    if (valid) {
      if (addEditForm.userId) {
        updateUser(addEditForm).then(() => {
          ElMessage({ message: '修改成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      } else {
        addUser(addEditForm).then(() => {
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
const postIdsOptions = ref([])
const roleIdsOptions = ref([])
const showModal = (row) => {
  if (row.userId) {
    getUser(row.userId).then(({ data }) => {
      postIdsOptions.value = data.posts
      roleIdsOptions.value = data.roles
      //edit
      addEditForm.postIds = data.postIds || []
      addEditForm.roleIds = data.roleIds || []
      reshowData(addEditForm, data.user)
      //edit modal
      title.value = '编辑用户'
    })
  } else {
    getUserInfo().then(({data})=>{
      postIdsOptions.value = data.posts
      roleIdsOptions.value = data.roles
      addEditForm.password = ''
      title.value = '新增用户'
    })
  }
  open.value = true
}
const reshowData = (addEditForm, detailData) => {
  Object.keys(addEditForm).forEach((fItem) => {
    if (detailData[fItem]) {
      addEditForm[fItem] = detailData[fItem]
    }
  })
}
const deptIdOptions = ref([])
const getDeptData = () => {
  deptIdReq().then(({ data }) => {
    deptIdOptions.value = data
  })
}
onMounted(() => {
  getDeptData()
})
//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss"></style>
