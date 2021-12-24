<template>
  <div class="errorLogContainer">
    <!--操作-->
    <div class="mr-3 rowSS">
      <el-button type="primary" @click="errorLogProd">错误日志测试</el-button>
      <el-button type="primary" @click="multiDelBtnClick">
        <!-- 感觉写法复杂了-->
        <el-icon style="vertical-align: middle">
          <Delete />
        </el-icon>
        <span style="vertical-align: middle">删除</span>
      </el-button>
      <!--条件搜索-->
      <el-form ref="refsearchFormMixin" :inline="true" class="demo-searchFormMixin ml-2">
        <el-form-item label-width="0px" label="" prop="errorLog" label-position="left">
          <el-input v-model="searchFormMixin.errorLog" class="widthPx-150" placeholder="错误日志" />
        </el-form-item>
        <el-form-item label-width="0px" label="" prop="pageUrl" label-position="left">
          <el-input v-model="searchFormMixin.pageUrl" class="widthPx-150" placeholder="页面路径" />
        </el-form-item>
        <el-form-item label-width="0px" label="" prop="createTime" label-position="left">
          <el-date-picker
            v-model="startEndArrMixin"
            type="datetimerange"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD HH:mm:ss"
            class="widthPx-250"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateTimePacking"
          />
        </el-form-item>
      </el-form>
      <!--查询按钮-->
      <el-button @click="searchBtnClick">查询</el-button>
    </div>
    <!--表格和分页-->
    <el-table
      id="resetElementDialog"
      ref="refuserTable"
      :height="`calc(100vh - ${settings.delWindowHeight})`"
      size="mini"
      border
      :data="usertableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="50" />
      <el-table-column align="center" prop="errorLog" label="错误日志" width="450">
        <template #default="{ row }">
          <div>{{ row.errorLog }}</div>
          <el-button type="text" size="small" @click="consoleToPlatform(row.errorLog)">
            click it console to platform to track
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="pageUrl" label="页面路径" min-width="180" />
      <el-table-column align="center" prop="version" label="版本号" width="60" />
      <el-table-column align="center" prop="browserType" label="浏览器类型" min-width="180" />
      <el-table-column align="center" prop="createTime" label="创建时间" width="140" />
      <!--点击操作-->
      <el-table-column fixed="right" align="center" label="操作" width="80">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="tableDelClick(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block columnCC mt-2">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalMixin"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--详情-->
    <el-dialog
      v-if="detailDialogMixin"
      v-model="detailDialogMixin"
      :title="dialogTitleMixin"
      width="40vw"
      :close-on-click-modal="false"
    >
      <div class="detail-container rowBC elODialogModalBodyH60vh">
        <div class="detail-container-item">DBC文件名：{{ detailData.username }}</div>
      </div>
      <div class="detail-container rowBC elODialogModalBodyH60vh">
        <div v-if="detailData.status === 1" class="detail-container-item" style="color: green">状态： 启用</div>
        <div v-else class="detail-container-item">状态： 停用</div>
      </div>
      <div class="detail-container rowBC elODialogModalBodyH60vh">
        <div class="detail-container-item">说明：{{ detailData.remark }}</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailDialogMixin = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--图片错误demo-->
    <img v-if="imgShow" src="http://img.png" />
  </div>
</template>

<script>
/*可以设置默认的名字*/
export default {
  name: 'ErrorLog'
}
</script>

<script setup>
import { Delete } from '@element-plus/icons-vue'
import { onMounted, getCurrentInstance, ref, reactive, onActivated, onDeactivated } from 'vue'
import settings from '@/settings'
let { proxy } = getCurrentInstance()
import bus from '@/utils/bus'
/*
 * 一般根据页面层次来排序 如此页面 表格查询和筛选->table的操作
 * 每个模块按：响应数据定义->公用方法->请求方法->页面按钮操作方法 进行排序
 * */

let testData = ref('testData')
onMounted(() => {
  console.log('testData', testData)
})
const errorLogProd = () => {
  throw new Error('产生的错误日志')
}
const consoleToPlatform = (err) => {
  //加个custom不收集
  console.error('custom' + err)
}

//img loader err test
let imgShow = ref(false)
const errorLogImg = () => {
  imgShow.value = !imgShow.value
}

/*表格查询和筛选*/
let usertableData = ref([])
let searchFormMixin = reactive({
  errorLog: '',
  pageUrl: '8.135.1.141',
  createTime: '',
  id: ''
})
let selectPageReq = () => {
  const data = Object.assign(searchFormMixin, {
    pageNum: pageNum,
    pageSize: pageSize
  })
  Object.keys(data).forEach((fItem) => {
    if (data[fItem] === '' || data[fItem] === null || data[fItem] === undefined) delete data[fItem]
  })
  let reqConfig = {
    url: '/ty-user/errorCollection/selectPage',
    method: 'get',
    data,
    isParams: true,
    bfLoading: false,
    isAlertErrorMsg: false
  }
  proxy.$axiosReq(reqConfig).then((resData) => {
    usertableData.value = resData.data?.records
    proxy.pageTotalMixin = resData.data?.total
  })
}
import tablePageHook from '@/hooks/useTablePage'
let { pageNum, pageSize, handleCurrentChange, handleSizeChange } = tablePageHook(selectPageReq)
const dateTimePacking = (timeArr) => {
  if (timeArr && timeArr.length === 2) {
    searchFormMixin.startTime = timeArr[0]
    searchFormMixin.endTime = timeArr[1]
  } else {
    searchFormMixin.startTime = ''
    searchFormMixin.endTime = ''
  }
}
onMounted(() => {
  selectPageReq()
  bus.on('reloadErrorPage', () => {
    selectPageReq()
  })
})
const searchBtnClick = () => {
  pageNum.value = 1
  selectPageReq()
}

/*添加和修改*/
/*详情*/
let detailData = ref({})
/*删除*/
let deleteByIdReq = (id) => {
  return proxy.$axiosReq({
    url: '/ty-user/errorCollection/deleteById',
    data: { id: id },
    isParams: true,
    method: 'delete',
    bfLoading: true
  })
}
let tableDelClick = async (row) => {
  await proxy
    .elConfirmMixin('确定', `您确定要删除【${row.pageUrl}】吗？`)
    .then(() => {
      deleteByIdReq(row.id).then(() => {
        selectPageReq()
        proxy.elMessageMixin(`【${row.pageUrl}】删除成功`)
      })
    })
    //不写catch会报错
    .catch(() => {})
}

/*批量删除*/
let multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const multiDelBtnClick = async () => {
  let rowDeleteIdArrMixin = []
  // let selectionArr = proxy.$refs.refuserTable //--c
  let deleteNameTitle = ''
  rowDeleteIdArrMixin = multipleSelection.value.map((mItem) => {
    deleteNameTitle = deleteNameTitle + mItem.pageUrl + ','
    return mItem.id
  })
  if (rowDeleteIdArrMixin.length === 0) {
    proxy.elMessageMixin('表格选项不能为空', 'warning')
    return
  }
  let stringLength = deleteNameTitle.length - 1
  await proxy.elConfirmMixin('删除', `您确定要删除【${deleteNameTitle.slice(0, stringLength)}】吗`)
  const data = rowDeleteIdArrMixin
  proxy
    .$axiosReq({
      url: `/ty-user/errorCollection/deleteBatchIds`,
      data,
      method: 'DELETE',
      bfLoading: true
    })
    .then(() => {
      proxy.elMessageMixin('删除成功')
      selectPageReq()
    })
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
