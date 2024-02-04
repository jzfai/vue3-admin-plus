<template>
  <div class="p-10px">
    <el-form v-show="showSearch" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model.trim="queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          class="wi-240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model.trim="queryParams.roleKey"
          placeholder="请输入权限字符"
          clearable
          class="wi-240px"
          @keyup.enter="handleQuery"
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
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport">
          导出
        </el-button>
      </el-col>
      <RightToolBar v-model:showSearch="showSearch" @queryTable="getList" />
      <ColumnFilter v-if="roleList.length" :is-operation="true" :cols="tableHeadColumns" @colChange="colChange" />
    </el-row>
    <el-table
      ref="refElTable"
      v-loading="loading"
      height="calc(100vh - 368px)"
      border
      :data="roleList"
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
            <el-switch :model-value="row.status" active-value="0" inactive-value="1" @click="handleStatusChange(row)" />
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template #default="{ row }">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" size="large" @click="handleUpdate(row)" />
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" size="large" @click="handleDelete(row)" />
          </el-tooltip>
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
    <DataAuthorModal ref="refDataAuthorModal" @getList="getList" />
  </div>
</template>
<script setup>
import {  onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import AddEditModal from './AddEditModal.vue'
import DataAuthorModal from './DataAuthorModal.vue'
import { colChange, currentHook, handleAdd, handleSelectionChange, removeEmptyKey } from './index-hook'
import Pagination from '@/components/Pagination/index.vue'
import ColumnFilter from '@/components/ColumnFilter.vue'
import RightToolBar from '@/components/RightToolBar.vue'
import { changeRoleStatus, listReq } from '@/api/role'
import { useDict } from '@/hooks/use-data-dict'

//导入当前页面封装方法
import { resetData } from '@/hooks/use-common'
/*查询模块*/
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  roleName: '', //角色名称

  roleKey: '', //权限字符
  status: '0', //状态
  beginTime: '', //创建时间开始时间
  endTime: '' //创建时间结束时间
})
//备份数据
const bakQueryParams = JSON.stringify(queryParams)
const dateRange = ref([])
//查询
const handleQuery = () => {
  queryParams.pageNum = 1
  getList(queryParams)
}
const handleStatusChange = (row) => {
  const text = row.status === '0' ? '停用' : '启用'
  elConfirm('确认', `确认要"${text}""${row.roleId}"角色吗?`)
    .then(() => {
      return changeRoleStatus(row.roleId, row.status === '0' ? '1' : '0')
    })
    .then(() => {
      ElMessage({ message: `${text}成功`, type: 'success' })
      row.status = row.status === '0' ? '1' : '0'
    })
}

//重置
const resetQuery = () => {
  resetData(queryParams, bakQueryParams)
  dateRange.value = []
  handleQuery()
}
const handleUpdate = (row) => {
  const roleId = row.roleId || ids.value[0]
  refAddEditModal.value.showModal({ roleId })
}
const getList = () => {
  loading.value = true
  if (dateRange.value?.length) {
    queryParams.beginTime = dateRange.value.at(-2)
    queryParams.endTime = dateRange.value.at(-1)
  } else {
    queryParams.beginTime = ''
    queryParams.endTime = ''
  }
  listReq(removeEmptyKey(queryParams)).then(({ data, total }) => {
    loading.value = false
    roleList.value = data
    totalNum.value = total
  })
}
onMounted(() => {
  handleQuery()
})
//字典数据
// eslint-disable-next-line camelcase
const { sys_normal_disable } = useDict(['sys_normal_disable'])

/** 分配数据权限操作 */
const refDataAuthorModal = ref(null)
const handleDataScope = (row) => {
  const roleId = row.roleId
  refDataAuthorModal.value.showModal({ roleId })
}

const router = useRouter()
const handleAuthUser = (row) => {
  router.push(`/system/role/auth-user/${row.roleId}`)
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
  roleList,
  showSearch,
  tableHeadColumns,
  handleExport,
  handleDelete
} = currentHook(queryParams, getList)
</script>
