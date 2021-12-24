<template>
  <el-button v-if="showImport" type="primary" @click="goUploadFile">
    导入
    <!--<slot name="fai" :data="{ a: 1 }" />-->
    <input ref="refSettingFile" type="file" style="display: none" accept=".xls, .xlsx" @change="excelValidReq" />
  </el-button>
  <el-button v-if="showExport" type="primary" @click="exportExcelReq">导出</el-button>
  <el-dialog v-if="dialogShow" v-model="dialogShow" :title="dialogTitle" width="500px" :close-on-click-modal="false">
    <!--错误信息-->
    <div v-if="!importInfo.checkResult" class="detail-container rowBC">
      <h4 v-for="(item, index) in importInfo.errList" :key="index" class="mbPx-4" style="color: red">{{ item }}</h4>
    </div>
    <div v-else style="color: #13ce66">需要导入的 {{ importInfo.successNum }} 条数据，检测通过</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="!importInfo.checkResult" type="primary" @click="excelImportReq">导 入</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import axiosReq from '@/utils/axiosReq'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  showImport: {
    require: true,
    default: true,
    type: Boolean
  },
  showExport: {
    require: true,
    default: true,
    type: Boolean
  },
  importValidUrl: {
    require: true,
    default: '',
    type: String
  },
  importFileUrl: {
    require: true,
    default: '',
    type: String
  },
  getSearchData: {
    require: true,
    type: Function
  },
  exportFileUrl: {
    require: true,
    default: '',
    type: String
  }
})

/*考勤表导入*/
let importInfo = ref({})
let dialogTitle = ref('导入校验')
let dialogShow = ref(false)
const refSettingFile = ref(null)
let excelValidReq = () => {
  const formData = new FormData()
  formData.append('file', refSettingFile.value.files[0])
  refSettingFile.value.value = ''
  axiosReq({
    url: props.importValidUrl,
    data: formData,
    method: 'post',
    bfLoading: true,
    isUploadFile: true
  })
    .then((res) => {
      importInfo.value = res.data
      refSettingFile.value.value = ''
      dialogShow.value = true
    })
    .catch(() => {
      refSettingFile.value.value = ''
    })
}
const goUploadFile = () => {
  refSettingFile.value.click()
}
const emit = defineEmits(['reloadList'])
let excelImportReq = () => {
  axiosReq({
    url: props.importFileUrl,
    data: importInfo.value?.successList,
    method: 'post',
    bfLoading: true
  }).then(() => {
    //通知父元素更新
    emit('reloadList')
    dialogShow.value = false
    ElMessage({ message: '导入成功', type: 'success' })
  })
}

// 导出table文件
const exportExcelReq = () => {
  axiosReq({
    url: props.exportFileUrl,
    data: props.getSearchData(),
    method: 'get',
    bfLoading: true,
    isParams: true,
    isDownLoadFile: true
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', decodeURI(res.headers?.exportfilename))
    document.body.appendChild(link)
    link.click()
  })
}
let { showImport, showExport } = props
</script>

<style scoped lang="scss"></style>
