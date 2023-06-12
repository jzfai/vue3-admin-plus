import { deleteReq, exportReq } from '@/api/operatorLog'
import { downLoadTemp } from '@/hooks/use-common'
import { ElMessage } from 'element-plus'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const operatorLogList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref()
const refElTable = ref()
const refExport = ref()
export const handleImport = () => {
  refExport.value.showModal()
}

const tableHeadColumns = ref([
  { prop: 'operId', label: '日志编号', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'title', label: '系统模块', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'businessType', label: '操作类型', minWidth: 150, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'operName', label: '操作人员', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'operIp', label: '主机', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'status', label: '操作状态', minWidth: 150, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'operTime', label: '操作日期', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'costTime', label: '消耗时间', minWidth: 150, isTemplate: false, align: 'center', showColumn: true }
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.operId)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}
export const colChange = (heardColsArr) => {
  tableHeadColumns.value = heardColsArr
}

export const handleAdd = () => {
  refAddEditModal.value.showModal({})
}

export const removeEmptyKey = (data) => {
  return Object.keys(data)
    .filter((key) => data[key] !== null && data[key] !== undefined && data[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
}

watch(
  () => tableHeadColumns,
  () => {
    if (refElTable) {
      nextTick(refElTable.value.doLayout)
    }
  },
  { deep: true }
)

export const currentHook = (queryParams, getList) => {
  const handleExport = () => {
    exportReq(queryParams).then((res) => {
      downLoadTemp(res)
    })
  }
  const handleDelete = (row) => {
    const operatorLogIds = row.operId || ids.value
    elConfirm('确认', `是否确认删除用户编号为"${operatorLogIds}"的数据项`)
      .then(() => {
        return deleteReq(operatorLogIds)
      })
      .then(() => {
        ElMessage({ message: '删除成功', type: 'success' })
        getList()
      })
  }
  return {
    refAddEditModal,
    handleDelete,
    refElTable,
    refExport,
    multiple,
    ids,
    single,
    totalNum,
    loading,
    operatorLogList,
    showSearch,
    tableHeadColumns,
    handleExport
  }
}
