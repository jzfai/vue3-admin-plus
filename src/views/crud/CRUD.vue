<template>
  <div class="scroll-y">
    <!--操作-->
    <div class="mr-3 rowSS">
      <el-button type="primary" @click="addBtnClick">
        <el-icon style="vertical-align: middle">
          <FolderAdd />
        </el-icon>
        <span style="vertical-align: middle">增加</span>
      </el-button>
      <el-button type="primary" @click="multiDelBtnClick">
        <el-icon style="vertical-align: middle">
          <Delete />
        </el-icon>
        <span style="vertical-align: middle">删除</span>
      </el-button>
      <!--条件搜索-->
      <el-form ref="refsearchForm" :inline="true" class="demo-searchForm ml-2">
        <el-form-item prop="name">
          <el-input v-model="searchForm.name" style="width: 120px" placeholder="品牌名称" />
        </el-form-item>
        <el-form-item prop="letter">
          <el-input v-model="searchForm.letter" style="width: 120px" placeholder="品牌的首字母" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-cascader
            :options="cascadeCreateTime"
            clearable="clearable"
            filterable="filterable"
            placeholder="创建时间"
            :show-all-levels="false"
            style="width: 120px"
          />
        </el-form-item>
      </el-form>
      <!--查询按钮-->
      <el-button type="primary" @click="searchBtnClick">查询</el-button>
    </div>
    <!--表格和分页-->
    <el-table
      id="resetElementDialog"
      ref="refuserTable"
      :height="`calc(100vh - ${settings.delWindowHeight})`"
      border="border"
      :data="usertableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="50" />
      <el-table-column align="center" prop="name" label="品牌名称" min-width="120">
        <template #default="{ row }">
          <span v-if="row.name == 1">1</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="image" label="品牌图片地址" min-width="120">
        <template #default="{ row }">
          <img :src="row.image" style="border-radius: 10px; width: 120px; height: 120px" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="letter" label="品牌的首字母" min-width="120" />
      <el-table-column align="center" prop="seq" label="排序" min-width="120" />
      <!--点击操作-->
      <el-table-column fixed="right" align="center" label="操作" width="130">
        <template #default="{ row }">
          <el-button text size="small" @click="tableEditClick(row)">编辑</el-button>
          <el-button text size="small" @click="tableDetailClick(row)">详情</el-button>
          <el-button text size="small" @click="tableDelClick(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block columnCC mt-2">
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
    <el-dialog v-model="detailDialog" :title="dialogTitle" width="500px" :close-on-click-modal="false">
      <div class="detail-container rowBC">
        <div class="detail-container-item">id：{{ detailData.id }}</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">品牌名称：{{ detailData.name }}</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">品牌图片地址：{{ detailData.image }}</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">品牌的首字母：{{ detailData.letter }}</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">排序：{{ detailData.seq }}</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailDialog = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <CRUDForm v-if="showFrom" ref="refCRUDForm" @hideComp="hideComp" @selectPageReq="selectPageReq" />
  </div>
</template>
<script setup="setup" name="Brand">
import { Delete, FolderAdd } from '@element-plus/icons-vue'
import tablePageHook from '@/hooks/useTablePage'
import settings from '@/settings'
import CRUDForm from './CRUDForm.vue'
let totalPage = $ref(0)
let startEndArr = $ref([])
/*2.表格操作和查询*/
let multipleSelection = $ref([])
const handleSelectionChange = (val) => {
  multipleSelection = val
}
let usertableData = $ref([])
let searchForm = reactive({ id: '', name: '', image: '', letter: '', seq: '' })
/*查询搜索相关*/
let selectPageReq = () => {
  const data = Object.assign(searchForm, {
    pageNum: pageNum,
    pageSize: pageSize
  })
  let reqConfig = {
    url: '/integration-front/brand/selectPage',
    method: 'get',
    data,
    isParams: true
  }
  axiosReq(reqConfig).then((resData) => {
    usertableData = resData.data?.records
    totalPage = resData.data?.total
  })
}
let { pageNum, pageSize, handleCurrentChange, handleSizeChange } = tablePageHook(selectPageReq)
let cascadeCreateTime = $ref([])
const cascadeProps = {
  multiple: false,
  value:
    '{"privileges":"select,insert,update,references","originField":"create_time","rule":"isNotNull","type":"Long","tableSchema":"micro-service-plus","datetimePrecision":0,"tableName":"tb_brand","optionDataArr":[{"label":1,"value":1}],"children":"children","extra":"on update CURRENT_TIMESTAMP","api":"","valueKey":"code","value":"value","componentType":"cascaderApi","method":"get","tbName":"create_time","dataType":"datetime","generationExpression":"","columnComment":"创建时间","optionData":"","fieldCase":"CreateTime","label":"label","ordinalPosition":6,"columnType":"datetime","field":"createTime","isNullable":"YES","width":120,"tableCatalog":"def","labelKey":"name","columnKey":"","columnName":"create_time","desc":"创建时间"}',
  label: 'label',
  children: 'children'
}
const cascadeCreateTimeReq = () => {
  let reqConfig = {
    url: '',
    method: 'get'
  }
  axiosReq(reqConfig).then((resData) => {
    cascadeCreateTime = resData.data
  })
}
const handleCascade = (data) => {
  console.log(data)
}
const searchBtnClick = () => {
  //此处要重置页数，也是常出的bug
  pageNum = 1
  selectPageReq()
}
//删除相关
let { elMessage, elConfirm } = useElement()
//多个删除
const refuserTable = $ref(null)
const multiDelBtnClick = () => {
  let rowDeleteIdArr = []
  let deleteNameTitle = ''
  rowDeleteIdArr = multipleSelection.map((mItem) => {
    deleteNameTitle = deleteNameTitle + mItem.name + ','
    return mItem.id
  })
  if (rowDeleteIdArr.length === 0) {
    elMessage('表格选项不能为空', 'warning')
    return
  }
  let stringLength = deleteNameTitle.length - 1
  elConfirm('删除', `您确定要删除${deleteNameTitle}吗`)
    .then(() => {
      const data = rowDeleteIdArr
      axiosReq({
        url: `/integration-front/brand/deleteBatchIds`,
        data,
        method: 'delete',
        bfLoading: true
      }).then((res) => {
        elMessage('删除成功')
        selectPageReq()
      })
    })
    .catch(() => {})
}
//单个删除
let deleteByIdReq = (id) => {
  return axiosReq({
    url: '/integration-front/brand/deleteById',
    data: { id: id },
    isParams: true,
    method: 'delete',
    bfLoading: true
  })
}
let tableDelClick = (row) => {
  elConfirm('确定', `您确定要删除【${row.name}】吗？`)
    .then(() => {
      deleteByIdReq(row.id).then(() => {
        selectPageReq()
        elMessage(`【${row.name}】删除成功`)
      })
    })
    .catch(() => {})
}
//添加和修改
let tableEditClick = (row) => {
  getDetailByIdReq(row.id).then((resData) => {
    showFrom = true
    nextTick(() => {
      refCRUDForm.showModal(true, resData.data)
    })
  })
}
let showFrom = $ref(false)
const refCRUDForm = $ref(null)
let addBtnClick = () => {
  showFrom = true
  nextTick(() => {
    refCRUDForm.showModal()
  })
}
const hideComp = () => {
  showFrom = false
}
/*3.详情modal*/
let detailData = $ref({})
let dialogTitle = $ref('')
let detailDialog = $ref(false)
let tableDetailClick = (row) => {
  dialogTitle = `详情【${row.name}】`
  getDetailByIdReq(row.id).then((resData) => {
    detailData = resData.data
    detailDialog = true
  })
}
let getDetailByIdReq = (id) => {
  return axiosReq({
    url: '/integration-front/brand/selectById',
    data: { id },
    isParams: true,
    method: 'get'
  })
}
onMounted(() => {
  selectPageReq()
  cascadeCreateTimeReq()
})
</script>

<style scoped="scoped" lang="scss">
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
