import { deleteReq, exportReq } from '@/api/platform'
import { downLoadTemp } from '@/hooks/use-common'
import { ElMessage } from 'element-plus'
/*table 列表*/
const totalNum = ref(0)
const loading = ref(false)
const platformList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref()
const refElTable = ref()

const refImport = ref()
const refExport = ref()
export const handleImport = () => {
  refImport.value.showModal()
}

const tableHeadColumns = ref([
  { prop: "name", label: "平台的名字", minWidth: 150,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "updateTime", label: "更新时间", minWidth: 150,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "updateBy", label: "更新人", minWidth: 150,isTemplate:false, align: 'center', showColumn: true  },
])
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
//多选
  const handleMultiDelete = () => {
    const platformIds = refElTable.value.getSelectionRows().map(m=>{
      return m.id
    })
    elConfirm('确认', `是否确认删除用户编号为"${platformIds}"的数据项`)
      .then(() => {
        return deleteReq(platformIds)
      })
      .then(() => {
        ElMessage({ message: '删除成功', type: 'success' })
        getList()
      })
  }
//单选
  const handleDelete = (row) => {
    elConfirm('确认',`是否确认删除用户编号为"${row.id}"的数据项`)
      .then(() => {
        return deleteReq({id:row.id})
      })
      .then(() => {
        ElMessage({ message: '删除成功', type: 'success' })
        getList()
      })
  }
  return {
    refAddEditModal,
    refElTable,
    totalNum,
    loading,
    platformList,
    showSearch,
    tableHeadColumns,
    refExport,
    handleExport,
    handleMultiDelete,
    handleDelete
  }
}
