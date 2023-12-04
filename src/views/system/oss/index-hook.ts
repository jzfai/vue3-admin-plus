import { ElMessage } from 'element-plus'
import { deleteReq, exportReq,multiDeleteReq } from '@/api/oss'
import { downLoadTemp } from '@/hooks/use-common'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const ossList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref()
const refElTable = ref()
const refExport = ref()
export const handleImport = () => {
  refExport.value.showModal()
}

const tableHeadColumns = ref([
  { prop: 'fileName', label: '文件名', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'originalName', label: '原名', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'fileSuffix', label: '文件后缀名', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'url', label: '文件展示', minWidth: 150, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'createTime', label: '创建时间', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'createBy', label: '上传人', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'service', label: '服务商', minWidth: 150, isTemplate: false, align: 'center', showColumn: true }
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.ossId)
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
  // const handleExport = () => {
  //   exportReq(queryParams).then((res) => {
  //     downLoadTemp(res)
  //   })
  // }
  const handleDelete = (row) => {
    const ossIds = row.ossId || ids.value
    elConfirm('确认', `是否确认删除用户编号为"${ossIds}"的数据项`)
      .then(() => {
        return deleteReq(ossIds)
      })
      .then(() => {
        ElMessage({ message: '删除成功', type: 'success' })
        getList()
      })
  }

  const handleDeleteMul = () => {
    const ossIds = ids.value
    elConfirm('确认', `是否确认删除用户编号为"${ossIds}"的数据项`)
      .then(() => {
        return multiDeleteReq(ossIds)
      })
      .then(() => {
        ElMessage({ message: '删除成功', type: 'success' })
        getList()
      })
  }

  return {
    handleDeleteMul,
    refAddEditModal,
    handleDelete,
    refElTable,
    refExport,
    multiple,
    ids,
    single,
    totalNum,
    loading,
    ossList,
    showSearch,
    tableHeadColumns
    // handleExport
  }
}
