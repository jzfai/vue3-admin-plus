<template>
  <!-- 添加或修改角色配置对话框 -->
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
    <el-form ref="roleRef" :model="addEditForm" label-width="80px">
      <el-form-item label="角色名称" prop="roleName" :rules="formRules.isNotNull('角色名称不能为空')">
        <el-input v-model="addEditForm.roleName" class="wi-150px" placeholder="角色名称" />
      </el-form-item>
      <el-form-item prop="roleKey">
        <template #label>
          <span>
            <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
            权限字符
          </span>
        </template>
        <el-input v-model="addEditForm.roleKey" placeholder="请输入权限字符" />
      </el-form-item>
      <el-form-item label="角色顺序" prop="roleSort" :rules="formRules.isNotNull('角色顺序不能为空')">
        <el-input-number v-model="addEditForm.roleSort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="addEditForm.status">
          <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
        <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>
        <el-checkbox v-model="addEditForm.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">
          父子联动
        </el-checkbox>
        <el-tree
          ref="menuRef"
          class="tree-border"
          :data="menuOptions"
          show-checkbox
          node-key="id"
          :check-strictly="!addEditForm.menuCheckStrictly"
          empty-text="加载中，请稍候"
          :props="{ label: 'label', children: 'children' }"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark" :rules="formRules.notValid('备注不能为空')">
        <el-input
          v-model="addEditForm.remark"
          type="textarea"
          maxlength="100"
          show-word-limit="show-word-limit"
          resize="none"
          clearable="clearable"
          class="wi-150px"
          placeholder="请输入备注"
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
import { addRole, getRole, menuOptionsReq, roleMenuTreeselect, updateRole } from '@/api/role'
import { useDict } from '@/hooks/use-dict'
import { resetData } from '@/hooks/use-common'
import { useCommon } from '../../../../ts-out-dir/src/hooks/use-common'

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const roleRef = ref('')
const open = ref(false)
const title = ref('新增角色')
const emits = defineEmits([])
// eslint-disable-next-line camelcase
const { sys_normal_disable } = useDict('sys_normal_disable')
const addEditForm = reactive({
  roleName: '',
  roleId: '',
  menuOptions: [],
  roleSort: 3,
  roleKey: '',
  status: '0',
  menuCheckStrictly: true,
  deptCheckStrictly: true,
  remark: ''
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  roleRef.value.validate((valid) => {
    if (valid) {
      addEditForm.menuIds = getMenuAllCheckedKeys()
      if (addEditForm.roleId !== '') {
        updateRole(addEditForm).then(() => {
          ElMessage({ message: '修改成功', type: 'success' })
          open.value = false
          emits('getList')
        })
      } else {
        addRole(addEditForm).then(() => {
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
const showModal = ({ roleId }) => {
  title.value = '新增角色'
  open.value = true
  if (roleId) {
    getRole(roleId).then(({ data }) => {
      reshowData(addEditForm, data)
      addEditForm.roleSort = Number(data.roleSort)
      //edit modal
      title.value = '编辑角色'
    })
    reshowTree(roleId)
  }
}

const reshowTree = (roleId) => {
  roleMenuTreeselect(roleId).then(({ data }) => {
    menuOptions.value = data.menus
    data?.checkedKeys?.forEach((v) => {
      nextTick(() => {
        menuRef.value.setChecked(v, true, false)
      })
    })
  })
}

const reshowData = (addEditForm, detailData) => {
  Object.keys(addEditForm).forEach((fItem) => {
    if (detailData[fItem]) {
      addEditForm[fItem] = detailData[fItem]
    }
  })
}
let menuOptions = ref([])
const menuOptionsData = () => {
  menuOptionsReq().then(({ data }) => {
    menuOptions.value = data
  })
}
onMounted(() => {
  menuOptionsData()
})

/** 树权限（展开/折叠）*/
const handleCheckedTreeExpand = (value, type) => {
  const treeList = menuOptions.value
  for (const element of treeList) {
    menuRef.value.store.nodesMap[element.id].expanded = value
  }
}

const menuRef = ref(null)
const deptRef = ref(null)
const menuExpand = ref(false)
const menuNodeAll = ref(false)
const deptExpand = ref(true)
const deptNodeAll = ref(false)
const deptOptions = ref([])
const openDataScope = ref(false)
/** 树权限（全选/全不选） */
const handleCheckedTreeNodeAll = (value) => {
  menuRef.value.setCheckedNodes(value ? menuOptions.value : [])
}
/** 树权限（父子联动） */
const handleCheckedTreeConnect = (value) => {
  addEditForm.menuCheckStrictly = !!value
}
/** 所有菜单节点数据 */
const getMenuAllCheckedKeys = () => {
  // 目前被选中的菜单节点
  const checkedKeys = menuRef.value.getCheckedKeys()
  // 半选中的菜单节点
  const halfCheckedKeys = menuRef.value.getHalfCheckedKeys()
  // eslint-disable-next-line prefer-spread
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
  return checkedKeys
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
