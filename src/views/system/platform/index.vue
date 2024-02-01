<template>
  <div class="p-10px">
    <el-form v-show="showSearch" :model="queryParams" :inline="true" label-width="68px">
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
      <el-form-item label="平台的名字" prop="name">
        <el-input
            v-model.trim="queryParams.name"
            placeholder="请输入平台的名字"
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
      <el-button type="danger" plain icon="Delete" @click="handleMultiDelete">删除</el-button>

      <RightToolBar v-model:showSearch="showSearch" @queryTable="getList"/>
      <ColumnFilter v-if="platformList.length" :is-operation="true" :cols="tableHeadColumns"
                    @colChange="colChange"/>
    </el-row>
    <el-table ref="refElTable" v-loading="loading" border :data="platformList">
      <el-table-column type="selection" width="50" align="center"/>
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
      </template>

      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template #default="{row}">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" size="large" @click="handleUpdate(row)"/>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" size="large" @click="handleDelete(row)"/>
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
    <AddEditModal ref="refAddEditModal" @getList="getList"/>
  </div>
</template>
<script setup lang="ts">
import {listReq} from '@/api/platform'
import {useDict} from '@/hooks/use-data-dict'
import {onMounted, reactive, ref} from "vue"
import RightToolBar from '@/components/RightToolBar.vue'
import ColumnFilter from '@/components/ColumnFilter.vue'
import  AddEditModal from "./AddEditModal.vue"
///导入当前页面封装方法
import { colChange, currentHook, handleAdd, removeEmptyKey } from './index-hook'
import { resetData } from '@/hooks/use-common'

/**********ref***********/
const dateRange = ref([])

/**********reactive***********/
const queryParams = reactive<any>({
  pageNum: 1,
  pageSize: 10,
  beginTime:"", //创建时间开始时间
  endTime:"",  //创建时间结束时间
  name:"",//平台的名字
})

/**********mounted***********/
//备份数据
const bakQueryParams = JSON.stringify(queryParams)
onMounted(() => {
  handleQuery()
})

/**********methods***********/
//查询
const handleQuery = () => {
      queryParams.pageNum = 1
      getList()
    }
//重置
const resetQuery = () => {
  resetData(queryParams, bakQueryParams)
  dateRange.value = []
  handleQuery()
}
const handleUpdate = (row) => {
  refAddEditModal.value.showModal({id:row.id})
}
const getList = () => {
  loading.value = true
  if (dateRange.value?.length) {
    queryParams.beginTime = dateRange.value.at(-2)
    queryParams.endTime = dateRange.value.at(-1)
  } else {
    queryParams.beginTime = ""
    queryParams.endTime = ""
  }
  listReq(removeEmptyKey(queryParams)).then(({data, total}:any) => {
    loading.value = false
    platformList.value = data
    totalNum.value = total
  })
}

/**********request***********/

/******defineExpose*******/
// import from index-hooks.ts
const {
  refAddEditModal,
  refElTable,
  totalNum,
  loading,
  platformList,
  showSearch,
  tableHeadColumns,
  handleMultiDelete,
  handleDelete
} = currentHook(queryParams, getList)
</script>
