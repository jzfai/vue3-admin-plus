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
    <el-form ref="roleRef" :model="addEditForm" label-width="120px">
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
      <el-form-item v-if="addEditForm.roleKey !== 'admin'" label="状态">
        <el-radio-group v-model="addEditForm.status">
          <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="平台权限选择" rules="formRules.isNotNull('平台选择不能为空')">
        <el-select
          v-model="addEditForm.platformIdsArr"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          class="w-600px"
          placeholder="请选择平台"
        >
          <el-option v-for="item in platformData" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="choosePlatformIds?.length" label="平台菜单配置">
        <el-radio-group v-model="platformIdsChoose">
          <el-radio v-for="item in choosePlatformIds" :key="item.id" :label="item.id" @click="menuConfigClick(item)">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="addEditForm.roleKey !== 'admin' && platformIdsChoose" label="菜单权限">
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
import {
  addRole,
  getRole,
  menuOptionsReq,
  roleMenuTreeselect,
  selectMenuListByPlateFormId,
  updateRole
} from '@/api/role'
import { useDict } from '@/hooks/use-dict'
import { resetData } from '@/hooks/use-common'
import { computed, ref } from 'vue'
import { selectPlatformAll } from '@/api/platform.ts'

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
  menuIds: [],
  menuOptions: [],
  roleSort: 3,
  roleKey: '',
  status: '0',
  menuCheckStrictly: true,
  deptCheckStrictly: true,
  remark: '',
  platformIds: [],
  platformIdsArr: []
})
const platformIdsChoose = ref()
const menuConfigClick = (item) => {
  //记录上一次的菜单选项
  platformMenuIdObj[platformIdsChoose.value] = getMenuAllCheckedKeys()
  // setMenuIds()
  //传递platform的id查询菜单列表
  selectMenuListByPlateFormId(item.id).then(({ data }) => {
    // menuList.value = data.rows
    menuOptions.value = data.menus
    // 回显选中的menu ids
    reshowTree(item.id)
    // getMenuIds(addEditForm.roleId)
  })
}
// const setMenuIds = () => {
//   //存储选中节点值
//   // getMenuAllCheckedKeys().forEach((item) => {
//   //   if (!addEditForm.menuIds.includes(item)) {
//   //     addEditForm.menuIds.push(item)
//   //   }
//   // })
//   //移除未选中节点值
//   // addEditForm.menuIds?.forEach((item, index) => {
//   //   if (getMenuNoCheckNode().includes(item)) {
//   //     addEditForm.menuIds.splice(index, 1)
//   //   }
//   // })
//   reshowTree()
// }
const choosePlatformIds = computed(() => {
  return platformData.value.filter((item) => addEditForm.platformIdsArr.includes(item.id))
})
const formString = JSON.stringify(addEditForm)
const submitForm = () => {
  roleRef.value.validate((valid) => {
    if (valid) {
      platformMenuIdObj[platformIdsChoose.value] = getMenuAllCheckedKeys()
      addEditForm.platformIds = JSON.stringify(addEditForm.platformIdsArr)
      addEditForm.menuIds = getCheckMenuIds()
      // setMenuIds()
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
  platformIdsChoose.value = ''
  menuOptions.value = []
  platformData.value = []
}
// const menuList = ref()
//存储平台key:选中的menu-arr
const platformMenuIdObj = reactive({})
const checkedKeys = ref([])
const showModal = ({ roleId }) => {
  title.value = '新增角色'
  open.value = true
  if (roleId) {
    getRole(roleId).then(({ data }) => {
      reshowData(addEditForm, data)
      addEditForm.roleSort = Number(data.roleSort)
      if (addEditForm.platformIds) {
        addEditForm.platformIdsArr = JSON.parse(addEditForm.platformIds)
        const firstPlatformId = addEditForm.platformIdsArr[0]
        platformIdsChoose.value = firstPlatformId
        //根据平台id获取菜单
        selectMenuListByPlateFormId(firstPlatformId).then(({ data }) => {
          // menuList.value = data.rows
          menuOptions.value = data.menus
          //回显menuIds
          roleMenuTreeselect(roleId).then(async ({ data }) => {
            //存储选中的key值
            checkedKeys.value = data?.checkedKeys
            await dillInitPlatformCheckMenuId(data?.checkedKeys)
            reshowTree(firstPlatformId)
          })
        })
      }
      //edit modal
      title.value = '编辑角色'
    })
  }
  platformList()
}
const arrGroupByKey = (arr, groupKey) => {
  const map = {}
  for (const ai of arr) {
    // 将需要筛选的属性的值作为新对象的键，并且判断是否已经存在
    if (!map[ai[groupKey]]) {
      // 不存在的话就在map对象中创建一个属性的值作为键名，键值为空数组的新对象，并且把arr[i]放入
      map[ai[groupKey]] = [ai]
    } else {
      // 如果已经存在就直接把arr[i]放入
      map[ai[groupKey]].push(ai)
    }
  }
  return map
}
import { listMenuReq } from '@/api/menu'
const dillInitPlatformCheckMenuId = (checkedKeys) => {
  return new Promise((resolve) => {
    listMenuReq().then(({ data }) => {
      const arrGroupByKey1 = arrGroupByKey(data, 'platformId')
      let checkMenuIdArr = []
      Object.keys(arrGroupByKey1).forEach((key) => {
        checkMenuIdArr = []
        arrGroupByKey1[key].forEach((item) => {
          if (checkedKeys?.includes(item.menuId)) {
            checkMenuIdArr.push(item.menuId)
          }
        })
        platformMenuIdObj[key] = checkMenuIdArr
      })
      resolve()
    })
  })
}

let menuOptions = ref([])
const reshowTree = (platformId) => {
  //menuOptions.value = data.menus
  platformMenuIdObj[platformId].forEach((v) => {
    nextTick(() => {
      menuRef.value.setChecked(v, true, false)
    })
  })
}

const getCheckMenuIds = () => {
  const keyArr = []
  Object.values(platformMenuIdObj).forEach((valueArr) => {
    valueArr.forEach((fItem) => {
      keyArr.push(fItem)
    })
  })
  return keyArr
}
//根据角色id获取菜单
// const roleMenuTreeReq = (roleId) => {
//   roleMenuTreeselect(roleId).then(({ data }) => {
//     reshowTree()
//   })
// }

const reshowData = (addEditForm, detailData) => {
  Object.keys(addEditForm).forEach((fItem) => {
    if (detailData[fItem]) {
      addEditForm[fItem] = detailData[fItem]
    }
  })
}

// const menuOptionsData = () => {
//   menuOptionsReq().then(({ data }) => {
//     menuOptions.value = data
//   })
// }
const platformData = ref([])
const platformList = () => {
  selectPlatformAll().then(({ data }) => {
    platformData.value = data
  })
}

/** 树权限（展开/折叠）*/
const handleCheckedTreeExpand = (value, type) => {
  const treeList = menuOptions.value
  for (const element of treeList) {
    menuRef.value.store.nodesMap[element.id].expanded = value
  }
}

const menuRef = ref(null)
const menuExpand = ref(false)
const menuNodeAll = ref(false)
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

//获取未选中节点数组
// const getMenuNoCheckNode = () => {
//   let mapIds = menuList.value
//     .filter((fItem) => !getMenuAllCheckedKeys().includes(fItem.menuId))
//     .map((mItem) => mItem.menuId)
//   return mapIds
// }

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
