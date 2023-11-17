import { deleteReq, exportReq } from '@/api/dict'
import { downLoadTemp } from '@/hooks/use-common'
import { ElMessage } from 'element-plus'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const dictList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref()
const refElTable = ref()
const refExport = ref()
export const handleImport = () => {
  refExport.value.showModal()
}

const tableHeadColumns = ref([
  { prop: "dictName", label: "字典名称", minWidth: 80,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "dictType", label: "字典类型", minWidth: 70,isTemplate:true, align: 'center', showColumn: true  },
  { prop: "status", label: "状态", minWidth: 60,isTemplate:true, align: 'center', showColumn: true  },
  { prop: "createTime", label: "创建时间", minWidth: 100,isTemplate:true, align: 'center', showColumn: true  },
  { prop: "remark", label: "备注", minWidth: 150,isTemplate:false, align: 'center', showColumn: true  },
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.dictId)
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
    const dictIds = row.dictId || ids.value
    elConfirm('确认',`是否确认删除用户编号为"${dictIds}"的数据项`)
      .then(() => {
        return deleteReq(dictIds)
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
    dictList,
    showSearch,
    tableHeadColumns,
    handleExport
  }
}
