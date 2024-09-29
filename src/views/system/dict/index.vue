<template>
  <div class="p-10px">
    <el-form v-show="showSearch" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="字典名称" prop="dictName">
        <el-input
          v-model.trim="queryParams.dictName"
          placeholder="请输入字典名称"
          clearable
          class="wi-150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType">
        <el-input
          v-model.trim="queryParams.dictType"
          placeholder="请输入字典类型"
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
      <el-form-item label="创建时间" style="width: 150px}">
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
      <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
<!--      <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate">修改</el-button>-->

      <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete">删除</el-button>

      <el-button type="warning" plain icon="Download" @click="handleExport">导出</el-button>

      <RightToolBar v-model:showSearch="showSearch" @queryTable="getList" />
      <ColumnFilter v-if="dictList.length" :is-operation="true" :cols="tableHeadColumns" @colChange="colChange" />
    </el-row>
    <el-table
      ref="refElTable"
      v-loading="loading"
      height="calc(100vh - 368px)"
      border
      :data="dictList"
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
        <!--字典类型-->
        <el-table-column
          v-if="item.prop === 'dictType' && item.isTemplate && item.showColumn"
          :key="item.prop"
          show-overflow-tooltip
          v-bind="item"
          align="center"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }">
            <el-button link type="primary" @click="routerPush('DictDataList', { dictType: row.dictType })">
              {{ row.dictType }}
            </el-button>
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
          <template #default="{  row }">
            <DictTag :options="sys_normal_disable" :value="row.status" />
          </template>
        </el-table-column>
        <!--创建时间-->
        <el-table-column
          v-if="item.prop === 'createTime' && item.isTemplate && item.showColumn"
          :key="item.prop"
          show-overflow-tooltip
          v-bind="item"
          align="center"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }">
            <span>{{ row.createTime }}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
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
import { onMounted, reactive, ref } from 'vue'
import AddEditModal from './AddEditModal.vue'
import { colChange, currentHook, handleAdd, handleSelectionChange, removeEmptyKey } from './index-hook'
import { listReq } from '@/api/dict'
import { useDict } from '@/hooks/use-data-dict'
//导入当前页面封装方法
import RightToolBar from '@/components/RightToolBar.vue'
import ColumnFilter from '@/components/ColumnFilter.vue'

///导入当前页面封装方法
import { resetData } from '@/hooks/use-common'
import { routerPush } from '@/hooks/use-self-router.ts'
/*查询模块*/
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  dictName: '', //字典名称
  dictType: '', //字典类型
  status: '', //状态
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
//重置
const resetQuery = () => {
  resetData(queryParams, bakQueryParams)
  dateRange.value = []
  handleQuery()
}
const handleUpdate = (row) => {
  const id = row.dictId || ids.value[0]
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
  listReq(removeEmptyKey(queryParams)).then(({ data, total }) => {
    console.log(data, total);
    loading.value = false
    dictList.value = data
    totalNum.value = total
  })
}
onMounted(() => {
  handleQuery()
})
// 字典数据
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
  dictList,
  showSearch,
  tableHeadColumns,
  handleExport,
  handleDelete
} = currentHook(queryParams, getList)
</script>
