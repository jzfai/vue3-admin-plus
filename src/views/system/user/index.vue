<template>
  <div class="p-10px">
    <el-form v-show="showSearch" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model.trim="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          class="wi-240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber">
        <el-input
          v-model.trim="queryParams.phonenumber"
          placeholder="请输入手机号码"
          clearable
          class="wi-240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="归属部门" prop="deptId">
        <el-tree-select
          v-model="queryParams.deptId"
          style="width: 150px !important"
          filterable
          default-expand-all
          :data="deptIdOptions"
          :props="{ value: 'deptId', label: 'deptName', children: 'children' }"
          value-key="id"
          placeholder="请选择归属部门"
          check-strictly
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable class="wi-240px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间" style="width: 240px}">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate">修改</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Upload" @click="handleImport">导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport()">导出</el-button>
      </el-col>
      <RightToolBar v-model:showSearch="showSearch" @queryTable="getList" />
      <ColumnFilter v-if="userList.length" :is-operation="true" :cols="tableHeadColumns" @colChange="colChange" />
    </el-row>
    <el-table
      ref="refElTable"
      v-loading="loading"
      height="calc(100vh - 370px)"
      border
      :data="userList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      <!--column头字段-->
      <template v-for="item in tableHeadColumns">
        <el-table-column
          v-if="!item.isTemplate && item.showColumn"
          :key="item.prop"
          show-overflow-tooltip
          v-bind="item"
          :align="item.align || 'center'"
          :prop="item.prop"
          :label="item.label"
        />
        <!--状态-->
        <el-table-column
          v-if="item.prop === 'status' && item.isTemplate && item.showColumn"
          :key="item.prop"
          show-overflow-tooltip
          v-bind="item"
          align="center"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }">
            <el-switch v-if="row.userName !== 'admin'" :model-value="row.status" active-value="0" inactive-value="1" @click="handleStatusChange(row)" />
            <span v-else>-</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template #default="{ row }">
          <div v-if="row.userName !== 'admin'">
            <el-tooltip  content="修改" placement="top">
              <el-button link type="primary" icon="Edit" size="large" @click="handleUpdate(row)" />
            </el-tooltip>
            <el-tooltip  content="删除" placement="top">
              <el-button link type="primary" icon="Delete" size="large" @click="handleDelete(row)" />
            </el-tooltip>
            <el-tooltip  content="重置密码" placement="top">
              <el-button link type="primary" icon="Key" size="large" @click="handleResetPwd(row)" />
            </el-tooltip>
          </div>

          <!--          <el-tooltip v-if="row.userId !== 1" content="分配角色" placement="top">-->
          <!--            <el-button link type="primary" icon="CircleCheck" size="large" @click="handleAuthRole(row)" />-->
          <!--          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="columnSE">
      <Pagination
        v-show="totalNum > 0"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        :total="totalNum"
        @pagination="getList"
      />
    </div>
    <AddEditModal ref="refAddEditModal" @getList="getList" />
    <Import ref="refExport" @getList="getList" />
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import AddEditModal from './AddEditModal.vue'
import Import from './Import.vue'
import { colChange, currentHook, handleAdd, handleImport, handleSelectionChange, removeEmptyKey } from './current-hook'
import Pagination from '@/components/Pagination/index.vue'
import ColumnFilter from '@/components/ColumnFilter.vue'
import RightToolBar from '@/components/RightToolBar.vue'
import { useDict } from '@/hooks/use-data-dict'
import { changeUserStatus, listReq, resetUserPwd } from '@/api/user'
import  * as  dept from '@/api/dept'

//导入当前页面封装方法
import { resetData } from '@/hooks/use-common'
import {handleTree} from "@/views/system/menu/index-hook";
/*查询模块*/
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  deptId: '',
  userName: '', //用户名称
  phonenumber: '', //手机号码
  status: '', //状态
  beginTime: '', //创建时间开始时间
  endTime: '', //创建时间结束时间
  dateRange: [] //创建时间
})

const filterNodeMethod = (value, data) => data.label.includes(value)
//备份数据
const bakQueryParams = JSON.stringify(queryParams)
const dateRange = ref([])
//查询
const handleQuery = () => {
  queryParams.pageNum = 1
  getList(queryParams)
}
//重置
const resetQuery = () => {
  resetData(queryParams, bakQueryParams)
  handleQuery()
}
// eslint-disable-next-line camelcase
const { sys_user_sex, sys_normal_disable } = useDict(['sys_user_sex', 'sys_normal_disable'])

const handleUpdate = (row) => {
  const userId = row.userId || ids[0] || 1
  refAddEditModal.value.showModal({ userId })
}
const getList = () => {
  loading.value = true
  if (dateRange.value.length) {
    queryParams.beginTime = dateRange.value.at(-1)
    queryParams.endTime = dateRange.value.at(-2)
  }
  listReq(removeEmptyKey(queryParams)).then(({ data, total }) => {
    loading.value = false
    userList.value = data
    totalNum.value = total
  })
}

const deptIdOptions = ref([])
const getDeptData = () => {
  dept.listReq({}).then(({ data }) => {
    deptIdOptions.value = handleTree(data, 'deptId')
  })
}
onMounted(() => {
  handleQuery()
  getDeptData()
})

const handleStatusChange = (row) => {
  const text = row.status === '0' ? '停用' : '启用'
  elConfirm('确认', `确认要"${text}""${row.userName}"用户吗?`)
    .then(() => {
      return changeUserStatus(row.userId, row.status === '0' ? '1' : '0')
    })
    .then(() => {
      ElMessage({ message: `${text}成功`, type: 'success' })
      row.status = row.status === '0' ? '1' : '0'
    })
}
//重置密码
const handleResetPwd = (row) => {
  ElMessageBox.prompt(`请输入"${row.userName}"的新密码`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    closeOnClickModal: false,
    inputPattern: /^.{5,20}$/,
    inputErrorMessage: '用户密码长度必须介于 5 和 20 之间'
  }).then(({ value }) => {
    resetUserPwd(row.userId, value).then(() => {
      ElMessage({ message: `修改成功，新密码是：${value}`, type: 'success' })
    })
  })
}
//分配角色
const router = useRouter()
const handleAuthRole = (row) => {
  router.push(`/user-auth/role/${row.userId}`)
}
const {
  refAddEditModal,
  refElTable,
  refExport,
  single,
  multiple,
  ids,
  totalNum,
  loading,
  userList,
  showSearch,
  tableHeadColumns,
  handleExport,
  handleDelete
} = currentHook(queryParams, getList)
</script>
