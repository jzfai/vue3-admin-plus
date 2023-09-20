<template>
  <div class="p-10px">
    <el-form v-show="showSearch" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="配置key" prop="configKey">
        <el-input
          v-model.trim="queryParams.configKey"
          placeholder="请输入配置key"
          clearable
          class="wi-150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="桶名称" prop="bucketName">
        <el-input
          v-model.trim="queryParams.bucketName"
          placeholder="请输入桶名称"
          clearable
          class="wi-150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete">删除</el-button>

      <RightToolBar v-model:showSearch="showSearch" @queryTable="getList" />
      <ColumnFilter v-if="ossConfigList.length" :is-operation="true" :cols="tableHeadColumns" @colChange="colChange" />
    </el-row>
    <el-table
      ref="refElTable"
      v-loading="loading"
      border
      :data="ossConfigList"
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
        <!--桶权限类型-->
        <el-table-column
          v-if="item.prop === 'accessPolicy' && item.isTemplate && item.showColumn"
          :key="item.prop"
          v-bind="item"
          align="center"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }">
            <el-tag v-if="row.accessPolicy === '0'" type="warning">private</el-tag>
            <el-tag v-if="row.accessPolicy === '1'" type="success">public</el-tag>
            <el-tag v-if="row.accessPolicy === '2'" type="info">custom</el-tag>
          </template>
        </el-table-column>
        <!--状态-->
        <el-table-column
          v-if="item.prop === 'status' && item.isTemplate && item.showColumn"
          :key="item.prop"
          v-bind="item"
          align="center"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }">
            <el-switch
              :model-value="row.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(row)"
            />
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
        v-show="totalNum > 10"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        :total="totalNum"
        @pagination="getList"
      />
    </div>
    <AddEditModal ref="refAddEditModal" @getList="getList" />
  </div>
</template>
<script setup>
import { changeOssConfigStatus, listReq } from '@/api/ossConfig'
import { changeRoleStatus } from '@/api/role.ts'
import { useDict } from '@/hooks/use-data-dict'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
//导入当前页面封装方法
import RightToolBar from '@/components/RightToolBar.vue'
import ColumnFilter from '@/components/ColumnFilter.vue'
import AddEditModal from './AddEditModal.vue'
/*查询模块*/
const queryParams = reactive({
  ossConfigId: '',
  pageNum: 1,
  pageSize: 10,
  configKey: '', //配置key
  bucketName: '', //桶名称
  status: '' //状态
})
const handleStatusChange = (row) => {
  const text = row.status === '0' ? '停用' : '启用'
  elConfirm('确认', `确认要"${text}""${row.ossConfigId}"配置吗?`)
    .then(() => {
      return changeOssConfigStatus(row.ossConfigId, row.status === '0' ? '1' : '0')
    })
    .then(() => {
      ElMessage({ message: `${text}成功`, type: 'success' })
      row.status = row.status === '0' ? '1' : '0'
    })
}
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
  dateRange.value = []
  handleQuery()
}
const handleUpdate = (row) => {
  const id = row.ossConfigId || ids.value[0]
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
  listReq(removeEmptyKey(queryParams)).then(({ rows, total }) => {
    loading.value = false
    ossConfigList.value = rows
    totalNum.value = total
  })
}
onMounted(() => {
  handleQuery()
})
//字典数据

///导入当前页面封装方法
import { colChange, currentHook, handleAdd, handleSelectionChange, removeEmptyKey } from './index-hook'
import { resetData } from '@/hooks/use-common'
const {
  refAddEditModal,
  refElTable,
  refExport,
  single,
  multiple,
  ids,
  totalNum,
  loading,
  ossConfigList,
  showSearch,
  tableHeadColumns,
  handleDelete
} = currentHook(queryParams, getList)
</script>
