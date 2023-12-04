<template>
  <div class="p-10px">
    <el-form v-show="showSearch" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          v-model.trim="queryParams.deptName"
          placeholder="请输入部门名称"
          clearable
          class="wi-150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable class="wi-150px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      <el-button type="info" plain icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
      <RightToolBar v-model:showSearch="showSearch" @queryTable="getList" />
      <ColumnFilter v-if="deptList.length" :is-operation="true" :cols="tableHeadColumns" @colChange="colChange" />
    </el-row>
    <el-table
      v-if="refreshTable"
      ref="refElTable"
      v-loading="loading"
      height="calc(100vh - 370px)"
      row-key="deptId"
      :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      :data="deptList"
      @selection-change="handleSelectionChange"
    >
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
        <!--排序-->
        <el-table-column
          v-if="item.prop === 'orderNum' && item.isTemplate && item.showColumn"
          :key="item.prop"
          show-overflow-tooltip
          v-bind="item"
          align="center"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }">
            <span>{{ row.orderNum }}</span>
          </template>
        </el-table-column>
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
            <DictTag :options="sys_normal_disable" :value="row.status" />
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template #default="{ row }">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" size="large" @click="handleUpdate(row)" />
          </el-tooltip>
          <el-tooltip content="新增" placement="top">
            <el-button link type="primary" icon="Plus" size="large" @click="handleAdd(row)" />
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" size="large" @click="handleDelete(row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <AddEditModal ref="refAddEditModal" @getList="getList" />
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import AddEditModal from './AddEditModal.vue'
import { colChange, currentHook, handleAdd, handleSelectionChange, removeEmptyKey } from './index-hook'
import { listReq } from '@/api/dept'
import { useDict } from '@/hooks/use-data-dict'
//导入当前页面封装方法
import RightToolBar from '@/components/RightToolBar.vue'
import ColumnFilter from '@/components/ColumnFilter.vue'

///导入当前页面封装方法
import { resetData } from '@/hooks/use-common'
import { handleTree } from '@/views/system/menu/index-hook'
/*查询模块*/
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  deptName: '', //部门名称
  status: '' //状态
})
//备份数据
const bakQueryParams = JSON.stringify(queryParams)
const dateRange = ref([])
//查询
const handleQuery = () => {
  queryParams.pageNum = 1
  getList(queryParams)
}

const isExpandAll = ref(true)

/** 展开/折叠操作 */
const refreshTable = ref(true)
const toggleExpandAll = () => {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}

//重置
const resetQuery = () => {
  resetData(queryParams, bakQueryParams)
  dateRange.value = []
  handleQuery()
}
const handleUpdate = (row) => {
  const id = row.deptId || ids.value[0]
  refAddEditModal.value.showModal({ id })
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
  listReq(removeEmptyKey(queryParams)).then(({ data }) => {
    loading.value = false
    deptList.value = handleTree(data, 'deptId')
  })
}
onMounted(() => {
  handleQuery()
})
//字典数据
// eslint-disable-next-line camelcase
const { sys_normal_disable } = useDict(['sys_normal_disable'])
const {
  refAddEditModal,
  refElTable,
  refExport,
  single,
  multiple,
  ids,
  totalNum,
  loading,
  deptList,
  showSearch,
  tableHeadColumns,
  handleExport,
  handleDelete
} = currentHook(queryParams, getList)
</script>
