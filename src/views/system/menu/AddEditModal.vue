<template>
  <!-- 添加或修改菜单配置对话框 -->
  <el-dialog
      v-if="open"
      v-model="open"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :title="title"
      width="600px"
      append-to-body
      @close="cancel"
  >
    <el-form ref="menuRef" :model="addEditForm" label-width="80px" inline>
      <el-form-item label="上级菜单" prop="parentId" :rules="formRules.notValid('用户昵称不能为空')">
        <el-tree-select
            v-model="addEditForm.parentId"
            :data="parentIdOptions"
            :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
            value-key="menuId"
            placeholder="请选择上级菜单"
            check-strictly
        />
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-radio-group v-model="addEditForm.menuType">
          <el-radio label="M">目录</el-radio>
          <el-radio label="C">菜单</el-radio>
          <el-radio label="F">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="平台选择" :rules="formRules.isNotNull('平台选择不能为空')">
        <el-select
            v-model="addEditForm.platformId"
            filterable
            default-first-option
            :reserve-keyword="false"
            placeholder="请选择平台"
        >
          <el-option v-for="item in platformData" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item
          v-if="addEditForm.menuType !== 'F'"
          label="菜单图标"
          prop="icon"
          :rules="formRules.notValid('菜单图标不能为空')"
      >
        <el-popover
            v-model="showChooseIcon"
            placement="bottom-start"
            :width="540"
            :hide-after="0"
            trigger="click"
            @show="showSelectIcon"
        >
          <template #reference>
            <el-input v-model="addEditForm.icon" placeholder="点击选择图标" readonly @blur="showSelectIcon">
              <template #prefix>
                <svg-icon
                    v-if="addEditForm.icon"
                    :icon-class="addEditForm.icon"
                    class="el-input__icon"
                    style="height: 32px; width: 16px; position: relative"
                />
                <el-icon v-else style="height: 32px; width: 16px">
                  <search/>
                </el-icon>
              </template>
            </el-input>
          </template>
          <IconSelect ref="iconSelectRef" @selected="selected"/>
        </el-popover>
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName" :rules="formRules.isNotNull('菜单名称不能为空')">
        <el-input v-model="addEditForm.menuName" class="wi-150px" placeholder="菜单名称"/>
      </el-form-item>
      <el-form-item label="显示排序" prop="orderNum" :rules="formRules.isNotNull('显示排序不能为空')">
        <el-input-number v-model="addEditForm.orderNum" controls-position="right" :min="0" placeholder="显示排序"/>
      </el-form-item>
      <el-form-item
          v-if="addEditForm.menuType !== 'F'"
          label="是否外链"
          prop="isFrame"
          :rules="formRules.notValid('请选择是否外链')"
      >
        <el-radio-group v-model="addEditForm.isFrame">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
          v-if="addEditForm.menuType !== 'F'"
          label="路由地址"
          prop="path"
          :rules="formRules.isNotNull('路由地址不能为空')"
      >
        <el-input v-model="addEditForm.path" class="wi-150px" placeholder="路由地址"/>
      </el-form-item>
      <el-form-item
          v-if="addEditForm.menuType === 'C'"
          label="组件路径"
          prop="component"
          :rules="formRules.notValid('组件路径不能为空')"
      >
        <el-input v-model="addEditForm.component" class="wi-150px" placeholder="组件路径"/>
      </el-form-item>
      <el-form-item
          v-if="addEditForm.menuType !== 'M'"
          label="权限字符"
          prop="perms"
          :rules="formRules.notValid('权限字符不能为空')"
      >
        <el-input v-model="addEditForm.perms" class="wi-150px" placeholder="权限字符"/>
      </el-form-item>
      <el-form-item v-if="addEditForm.menuType !== 'F'" label="redirect" prop="redirect">
        <el-input v-model="addEditForm.redirect" class="wi-150px" placeholder="redirect"/>
      </el-form-item>
      <el-form-item
          v-if="addEditForm.menuType !== 'F'"
          label="routeName"
          prop="routeName"
          :rules="formRules.isNotNull('routeName')"
      >
        <el-input v-model="addEditForm.routeName" class="wi-150px" placeholder="routeName"/>
      </el-form-item>
      <el-form-item
          v-if="addEditForm.menuType === 'M'"
          label="alwaysShow"
          prop="alwaysShow"
          :rules="formRules.notValid('alwaysShow')"
      >
        <el-radio-group v-model="addEditForm.alwaysShow">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="addEditForm.menuType !== 'F'" label="显示状态" :rules="formRules.notValid('请选择显示状态')">
        <el-radio-group v-model="addEditForm.visible">
          <el-radio v-for="dict in sys_show_hide" :key="dict.value" :label="dict.value">
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="addEditForm.menuType !== 'F'" label="菜单状态" :rules="formRules.notValid('请选择菜单状态')">
        <el-radio-group v-model="addEditForm.status">
          <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="addEditForm.menuType !== 'F'" label="meta">
        <JsonInput ref="refJsonInput"/>
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
import JsonInput from '@/components/JsonInput.vue'
import {ElMessage} from 'element-plus'
import {addMenu, getMenu, listMenuReq, updateMenu} from '@/api/menu'
import {useDict} from '@/hooks/use-data-dict'
import {resetData} from '@/hooks/use-common'
import IconSelect from './IconSelect.vue'
import {handleTree} from '@/views/system/menu/index-hook'
import {ref} from 'vue'
import {selectPlatformAll} from '@/api/platform.ts'

const showChooseIcon = ref(false)
const iconSelectRef = ref(null)

/** 展示下拉图标 */
function showSelectIcon() {
  iconSelectRef.value.reset()
  showChooseIcon.value = true
}

/** 选择图标 */
function selected(name) {
  addEditForm.icon = name
  showChooseIcon.value = false
}

/** 图标外层点击隐藏下拉列表 */
function hideSelectIcon(event) {
  const elem = event.relatedTarget || event.srcElement || event.target || event.currentTarget
  const className = elem.className
  if (className !== 'el-input__inner') {
    showChooseIcon.value = false
  }
}

//element valid
const formRules = useElement().formRules
/** 提交按钮 */
const menuRef = ref('')
const open = ref(false)
const title = ref('新增菜单')
const emits = defineEmits([])
// eslint-disable-next-line camelcase
const {sys_show_hide, sys_normal_disable} = useDict(['sys_show_hide', 'sys_normal_disable'])
let addEditForm = reactive({
  icon: '',
  menuId: '',
  menuName: '',
  path: '',
  redirect: '',
  routeName: '',
  alwaysShow: 1,
  component: '',
  perms: '',
  parentId: '',
  orderNum: 10,
  menuType: 'M',
  isFrame: '1',
  visible: '0',
  status: '0',
  platformId: ''
})
const formString = JSON.stringify(addEditForm)
const refJsonInput = ref()
const submitForm = () => {
  menuRef.value.validate((valid) => {
    if (refJsonInput.value) {
      const jsonData = refJsonInput.value.returnData()
      addEditForm.metaExtra = JSON.stringify(jsonData)
    }
    if (valid) {
      if (addEditForm.menuType === 'M' && !addEditForm.path.startsWith("/")) {
        addEditForm.path = `/${addEditForm.path}`
      }
      //校验
      if (addEditForm.menuId) {
        updateMenu(addEditForm).then(() => {
          ElMessage({message: '修改成功', type: 'success'})
          open.value = false
          emits('getList')
        })
      } else {
        addMenu(addEditForm).then(() => {
          ElMessage({message: '新增成功', type: 'success'})
          open.value = false
          emits('getList')
        })
      }
      //重置菜单
      //location.reload()
    }
  })
}
/** 取消按钮 */
const cancel = () => {
  open.value = false
  resetData(addEditForm, formString)
}
const showModal = (row) => {
  if (row.menuId) {
    getMenu(row.menuId).then(({data}) => {
      reshowData(addEditForm, data)
      if (!addEditForm.parentId) addEditForm.parentId = 0
      //edit modal
      title.value = '编辑菜单'
      refJsonInput.value.initData(data.metaExtra)
    })
  } else {
    //回显赛选的平台
    addEditForm.platformId = row.platformId
  }
  addEditForm.parentId = row.parentId
  title.value = '新增菜单'
  open.value = true

  platformList()
  getNameData(row.platformId)
}

const parentIdOptions = ref([])
const getNameData = (platformId) => {
  listMenuReq({platformId}).then(({data}) => {
    const menu = {menuId: 0, menuName: '主类目', children: []}
    menu.children = handleTree(data, 'menuId')
    parentIdOptions.value = [menu]
  })
}
const platformData = ref([])
const platformList = () => {
  selectPlatformAll().then(({data}) => {
    platformData.value = data
  })
}

//导出给refs使用
defineExpose({cancel, showModal})
</script>

<style scoped lang="scss"></style>

