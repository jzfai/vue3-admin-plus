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
          <el-input v-model="searchForm.name" style="width: 120px" placeholder="选中的字段配置" />
        </el-form-item>
        <el-form-item prop="generatorConfig">
          <el-input v-model="searchForm.generatorConfig" style="width: 120px" placeholder="生成的配置" />
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
    >
      <el-table-column align="center" prop="name" label="选中的字段配置" min-width="120" />
      <el-table-column align="center" prop="generatorConfig" label="生成的配置" min-width="120" />
      <!--点击操作-->
      <el-table-column fixed="right" align="center" label="操作" width="150">
        <template #default="{ row }">
          <div class="rowSS reset-element-button-left">
            <el-button type="text" size="small" @click="tableEditClick(row)">编辑</el-button>
            <el-button type="text" size="small" @click="tableDetailClick(row)">详情</el-button>
            <el-button type="text" size="small" @click="tableDelClick(row)">删除</el-button>
          </div>
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
        <div class="detail-container-item">：{{ detailData.id }}</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">选中的字段配置：{{ detailData.name }}</div>
      </div>
      <div class="detail-container rowBC">
        <div class="detail-container-item">生成的配置：{{ detailData.generatorConfig }}</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailDialog = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <GeneratorConfigSaveForm
      v-if="showFrom"
      ref="refGeneratorConfigSaveForm"
      @hideComp="hideComp"
      @selectPageReq="selectPageReq"
    />
  </div>
</template>
<script setup="setup">
defineOptions({ name: 'GeneratorConfigSave' })
import { Delete, FolderAdd } from '@element-plus/icons-vue'
import tablePageHook from '@/hooks/useTablePage'
import settings from '@/settings'
import GeneratorConfigSaveForm from './GeneratorConfigSaveForm.vue'
let totalPage = $ref(0)
let startEndArr = $ref([])
let usertableData = $ref([])
let searchForm = reactive({ id: '', name: '', generatorConfig: '' })
/*查询搜索相关*/
let selectPageReq = () => {
  const data = Object.assign(searchForm, {
    pageNum: pageNum,
    pageSize: pageSize
  })
  let reqConfig = {
    url: '/integration-front/generatorConfigSave/selectPage',
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
const searchBtnClick = () => {
  //此处要重置页数，也是常出的bug
  pageNum = 1
  selectPageReq()
}
//删除相关
let { elMessage, elConfirm } = useElement()
//多个删除
const multipleSelection = $ref([])
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
        url: `/integration-front/generatorConfigSave/deleteBatchIds`,
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
    url: '/integration-front/generatorConfigSave/deleteById',
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
      refGeneratorConfigSaveForm.showModal(true, resData.data)
    })
  })
}
let showFrom = $ref(false)
const refGeneratorConfigSaveForm = $ref(null)
let addBtnClick = () => {
  showFrom = true
  nextTick(() => {
    refGeneratorConfigSaveForm.showModal()
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
    url: '/integration-front/generatorConfigSave/selectById',
    data: { id },
    isParams: true,
    method: 'get'
  })
}
onMounted(() => {
  selectPageReq()
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
