<template>
  <div class="p-10px">
    <el-form v-show="showSearch" :model="queryParams" :inline="true" label-width="80px">
      <el-form-item label="文件名" prop="fileName">
        <el-input
          v-model.trim="queryParams.fileName"
          placeholder="请输入文件名"
          clearable
          class="wi-150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原名" prop="originalName">
        <el-input
          v-model.trim="queryParams.originalName"
          placeholder="请输入原名"
          clearable
          class="wi-150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="文件后缀名" prop="fileSuffix">
        <el-input
          v-model.trim="queryParams.fileSuffix"
          placeholder="请输入文件后缀名"
          clearable
          class="wi-150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务商" prop="service">
        <el-input
          v-model.trim="queryParams.service"
          placeholder="请输入服务商"
          clearable
          class="wi-150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" style="width: 150px}">
        <el-date-picker
          v-model="timeRange"
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
    <el-row :gutter="10" class="mb-10px">
      <el-button type="primary" plain @click="handleFile">上传文件</el-button>
      <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDeleteMul">删除</el-button>

      <RightToolBar v-model:showSearch="showSearch" @queryTable="getList" />
      <ColumnFilter v-if="ossList.length" :is-operation="true" :cols="tableHeadColumns" @colChange="colChange" />
    </el-row>
    <el-table
      ref="refElTable"
      v-loading="loading"
      height="calc(100vh - 350px)"
      border
      :data="ossList"
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
        <!--文件展示-->
        <el-table-column
          v-if="item.prop === 'url' && item.isTemplate && item.showColumn"
          :key="item.prop"
          show-overflow-tooltip
          v-bind="item"
          align="center"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }">
            <el-image
              v-if="checkFileSuffix(row.fileSuffix)"
              style="width: 100px; height: 100px"
              :src="row.frontDillUrl"
              preview-teleported
              :preview-src-list="[row.frontDillUrl]"
            />
            <svg-icon v-else icon-class="job" class="imgStyle" />
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
        <template #default="{ row }">
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
import { listReq } from '@/api/oss'
import { useDict } from '@/hooks/use-data-dict'
import { onMounted, reactive, ref } from 'vue'
//导入当前页面封装方法
import RightToolBar from '@/components/RightToolBar.vue'
import ColumnFilter from '@/components/ColumnFilter.vue'
import AddEditModal from './UploadFileImage.vue'
/*查询模块*/
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  name: '', //平台名字
  fileName: '', //文件名
  originalName: '', //原名
  fileSuffix: '', //文件后缀名
  service: '', //服务商
  createTime: '', //创建时间开始时间
  endTime: '' //创建时间结束时间
})

/** 上传文件 */
const handleFile = () => {
  refAddEditModal.value.showModal({ type: 0 })
}
/** 上传图片 */
const handleImage = () => {
  refAddEditModal.value.showModal({ type: 1 })
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

const checkFileSuffix = (fileSuffix) => {
  const arr = ['png', 'jpg', 'jpeg']
  return arr.some((type) => {
    return fileSuffix.includes(type)
  })
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
    ossList.value = rows.map((mItem) => {
      mItem.frontDillUrl = spliceMinioUrl(mItem.url)
      return mItem
    })
    totalNum.value = total
  })
}
onMounted(() => {
  handleQuery()
})
//字典数据
// eslint-disable-next-line camelcase
// const {
// } = useDict(
// )

///导入当前页面封装方法
import { colChange, currentHook, handleAdd, handleSelectionChange, removeEmptyKey } from './index-hook'
import { resetData, spliceMinioUrl } from '@/hooks/use-common'
const {
  refAddEditModal,
  refElTable,
  refExport,
  single,
  multiple,
  ids,
  totalNum,
  loading,
  ossList,
  showSearch,
  tableHeadColumns,
  handleExport,
  handleDelete,
  handleDeleteMul
} = currentHook(queryParams, getList)
</script>
