<template>
  <div class="scroll-y">
    <!--操作-->
    <div class="mr-3 rowSS">
      <el-button type="primary" @click="addBtnClick">新增</el-button>
      <el-button type="primary" @click="multiDelBtnClick">删除</el-button>
      <!--条件搜索-->
      <el-form ref="refsearchForm" :inline="true" class="demo-searchForm ml-3">
        <el-form-item label-width="0px" label="" prop="sn" label-position="left">
          <el-input v-model="searchForm.sn" class="widthPx-150" placeholder="设备号" />
        </el-form-item>
        <el-form-item label-width="0px" label="" prop="status" label-position="left">
          <el-select v-model="searchForm.status" clearable placeholder="状态" class="widthPx-120">
            <el-option label="未出库" :value="0" />
            <el-option label="已出库" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label-width="0px" label="" prop="createTime" label-position="left">
          <el-date-picker
            v-model="startEndArr"
            type="datetimerange"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD HH:mm:ss"
            class="widthPx-200"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateTimePacking"
          />
        </el-form-item>
      </el-form>
      <!--查询按钮-->
      <el-button type="primary" @click="searchBtnClick">搜索</el-button>
      <div class="ml-4">
        <ImportExportComp
          import-file-url="/integration-front/vci/importExcel"
          import-valid-url="/integration-front/vci/validExcel"
          export-file-url="/integration-front/vci/exportExcel"
          :get-search-data="getSearchData"
          @reloadList="selectPageReq"
        />
        <el-button type="primary" @click="downloadTemplate">down template to test</el-button>
      </div>
    </div>
    <!--表格和分页-->
    <el-table
      id="resetElementDialog"
      ref="refuserTable"
      height="calc(100vh - 280px)"
      border
      :data="VcitableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" prop="sn" label="设备号" min-width="100" />
      <el-table-column align="center" prop="hardVersion" label="硬件版本" min-width="100" />
      <el-table-column align="center" prop="createTime" label="入库时间" width="150" />
      <el-table-column align="center" prop="status" label="状态" min-width="100">
        <template #default="{ row }">
          <span v-if="row.status === 0">未出库</span>
          <h4 v-if="row.status === 1" style="color: green">已出库</h4>
        </template>
      </el-table-column>
      <!--点击操作-->
      <el-table-column align="center" label="操作" width="120px">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="tableEditClick(row)">编辑</el-button>
          <el-button type="text" size="small" @click="tableDelClick(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block columnCC mt-2 mb-5">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <VciForm v-if="showFrom" ref="refVciForm" @hideComp="hideComp" @selectPageReq="selectPageReq" />
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance, ref, reactive } from 'vue'
import VciForm from './VciForm.vue'
//获取子组件实例
const refVciForm = ref(null)

/*2.表格操作和查询*/
let multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
let VcitableData = ref([])
let searchForm = reactive({
  id: '',
  sn: '',
  hardVersion: '',
  softVersion: '',
  createTime: '',
  status: '',
  remark: ''
})
onMounted(() => {
  selectPageReq()
})

const getSearchData = () => {
  const data = Object.assign(searchForm, {
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
  Object.keys(data).forEach((fItem) => {
    if (data[fItem] === '' || data[fItem] === null || data[fItem] === undefined) delete data[fItem]
  })
  return data
}

const { totalPage, startEndArr } = useCommon()
let selectPageReq = () => {
  let reqConfig = {
    url: '/integration-front/vci/selectPage',
    method: 'get',
    data: getSearchData(),
    isParams: true,
    isAlertErrorMsg: false
  }
  axiosReq(reqConfig).then((resData) => {
    VcitableData.value = resData.data?.records
    totalPage.value = resData.data?.total
  })
}

import tablePageHook from '@/hooks/useTablePage'
let { pageNum, pageSize, handleCurrentChange, handleSizeChange } = tablePageHook(selectPageReq)
//时间packing
const dateTimePacking = (timeArr) => {
  if (timeArr && timeArr.length === 2) {
    searchForm.startTime = timeArr[0]
    searchForm.endTime = timeArr[1]
  } else {
    searchForm.startTime = ''
    searchForm.endTime = ''
  }
}

const searchBtnClick = () => {
  //此处要重置页数，也是常出的bug
  pageNum.value = 1
  selectPageReq()
}

//添加和修改
let showFrom = ref(false)
let addBtnClick = () => {
  showFrom.value = true
  nextTick(() => {
    refVciForm.value.showModal()
  })
}
let tableEditClick = (row) => {
  showFrom.value = true
  nextTick(() => {
    refVciForm.value.showModal(true, row)
  })
}

const hideComp = () => {
  showFrom.value = false
}

//删除
let { elMessage, elConfirm } = useElement()
let deleteByIdReq = (id) => {
  return axiosReq({
    url: '/integration-front/vci/deleteById',
    data: { id: id },
    isParams: true,
    method: 'delete',
    bfLoading: true
  })
}
let tableDelClick = async (row) => {
  await elConfirm('确定', `您确定要删除【${row.sn}】吗？`)
  deleteByIdReq(row.id).then(() => {
    selectPageReq()
    elMessage(`【${row.sn}】删除成功`)
  })
}
//批量删除
const multiDelBtnClick = async () => {
  let rowDeleteIdArr = []
  let deleteNameTitle = ''
  rowDeleteIdArr = multipleSelection.value.map((mItem) => {
    deleteNameTitle = deleteNameTitle + mItem.sn + ','
    return mItem.id
  })
  if (rowDeleteIdArr.length === 0) {
    elMessage('表格选项不能为空', 'warning')
    return
  }
  let stringLength = deleteNameTitle.length - 1
  await elConfirm('删除', `您确定要删除${deleteNameTitle.slice(0, stringLength)}吗`)
  const data = rowDeleteIdArr
  axiosReq({
    url: `/integration-front/vci/deleteBatchIds`,
    data,
    method: 'DELETE',
    bfLoading: true
  }).then(() => {
    elMessage('删除成功')
    selectPageReq()
  })
}

//download template
const downloadTemplate = () => {
  const link = document.createElement('a')
  link.href = 'http://8.135.1.141/file/template/export-import-template.xlsx'
  link.setAttribute('download', `import-export-template.xls`)
  document.body.appendChild(link)
  link.click()
}
</script>

<style scoped lang="scss">
/*详情*/
.detail-container {
  flex-wrap: wrap;
}

.detail-container-item {
  min-width: 40%;
  margin-bottom: 20px;
}

.detailDialog-title {
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 16px;
}
</style>
