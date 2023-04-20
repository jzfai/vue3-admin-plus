<template>
  <!-- 添加或修改数据权限配置对话框 -->
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
    <el-form ref="dataAuthRef" :model="addEditForm" label-width="80px">
      <el-form-item label="角色名称" prop="roleName" :rules="formRules.isNotNull('角色名称不能为空')">
        <el-input v-model="addEditForm.roleName" class="wi-150px" placeholder="角色名称" />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey" :rules="formRules.isNotNull('权限字符不能为空')">
        <el-input v-model="addEditForm.roleKey" class="wi-150px" placeholder="权限字符" />
      </el-form-item>
      <el-form-item label="权限范围" :rules="formRules.isNotNull('请选择权限范围')">
        <el-select v-model="addEditForm.dataScope" placeholder="权限范围" class="wi-150px">
          <el-option v-for="dict in dataScopeOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item v-show="addEditForm.dataScope == 2" label="数据权限">
        <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event)">展开/折叠</el-checkbox>
        <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event)">全选/全不选</el-checkbox>
        <el-checkbox v-model="addEditForm.deptCheckStrictly" @change="handleCheckedTreeConnect($event)">
          父子联动
        </el-checkbox>
        <el-tree
          ref="deptRef"
          class="tree-border"
          :data="deptOptions"
          show-checkbox
          default-expand-all
          node-key="id"
          :check-strictly="!addEditForm.deptCheckStrictly"
          empty-text="加载中，请稍候"
          :props="{ label: 'label', children: 'children' }"
        />
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
import { addDataAuth, deptTreeSelect, updateDataAuth } from '@/api/dataAuth'
import { resetData } from '@/hooks/use-common'
import { getRole } from '@/api/role'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const dataAuthRef = ref('')
let open = ref(false)
let title = ref('新增数据权限')
const emits = defineEmits([])
let addEditForm = reactive({
  roleName: '',
  roleId: '',
  roleKey: '',
  dataScope: '',
  deptCheckStrictly: ''
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  dataAuthRef.value.validate((valid) => {
    if (valid) {
      addEditForm.deptIds = getDeptAllCheckedKeys()
      if (addEditForm.roleId !== '') {
        updateDataAuth(addEditForm).then(() => {
          ElMessage({ message: '权限更新成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      } else {
        addDataAuth(addEditForm).then(() => {
          ElMessage({ message: '新增成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      }
    }
  })
}

/** 所有部门节点数据 */
const getDeptAllCheckedKeys = () => {
  // 目前被选中的部门节点
  let checkedKeys = deptRef.value.getCheckedKeys()
  // 半选中的部门节点
  let halfCheckedKeys = deptRef.value.getHalfCheckedKeys()
  // eslint-disable-next-line prefer-spread
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
  return checkedKeys
}
/** 取消按钮 */
const cancel = () => {
  open.value = false
  resetData(addEditForm, formString)
}
const showModal = ({ roleId }) => {
  if (roleId) {
    getRole(roleId).then(({ data }) => {
      reshowData(addEditForm, data)
      reshowTree(roleId)
      //edit modal
      title.value = '分配数据权限'
    })
  }
  title.value = '分配数据权限'
  open.value = true
}

const reshowTree = (roleId) => {
  deptTreeSelect(roleId).then(({ data }) => {
    deptOptions.value = data.depts
    nextTick(() => deptRef.value.setCheckedKeys(data.checkedKeys))
  })
}

const dataScopeOptions = ref([
  { value: '1', label: '全部数据权限' },
  { value: '2', label: '自定数据权限' },
  { value: '3', label: '本部门数据权限' },
  { value: '4', label: '本部门及以下数据权限' },
  { value: '5', label: '仅本人数据权限' }
])
const reshowData = (addEditForm, detailData) => {
  Object.keys(addEditForm).forEach((fItem) => {
    if (detailData[fItem]) {
      addEditForm[fItem] = detailData[fItem]
    }
  })
}

/** 树权限（展开/折叠）*/
const deptExpand = ref(true)
const deptNodeAll = ref(false)
const deptOptions = ref([])
const deptRef = ref(null)
function handleCheckedTreeExpand(value) {
  let treeList = deptOptions.value
  for (const element of treeList) {
    deptRef.value.store.nodesMap[element.id].expanded = value
  }
}
/** 树权限（全选/全不选） */
function handleCheckedTreeNodeAll(value) {
  deptRef.value.setCheckedNodes(value ? deptOptions.value : [])
}
/** 树权限（父子联动） */
function handleCheckedTreeConnect(value) {
  addEditForm.deptCheckStrictly = !!value
}

//导出给refs使用
defineExpose({ cancel, showModal })
</script>

<style scoped lang="scss">
.tree-border {
  margin-top: 5px;
  border: 1px solid #e5e6e7;
  background: #ffffff none;
  border-radius: 4px;
  width: 100%;
}
</style>
