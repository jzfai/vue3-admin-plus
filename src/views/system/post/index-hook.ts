import { ElMessage } from 'element-plus'
import { deleteReq, exportReq } from '@/api/post'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const postList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref()
const refElTable = ref()
const refExport = ref()
export const handleImport = () => {
  refExport.value.showModal()
}

const tableHeadColumns = ref([
  { prop: 'postId', label: '岗位编号', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'postCode', label: '岗位编码', minWidth: 150, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'status', label: '状态', minWidth: 150, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'createTime', label: '创建时间', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'postName', label: '岗位名称', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'postSort', label: '岗位排序', minWidth: 150, isTemplate: false, align: 'center', showColumn: true }
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.postId)
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
    const postIds = row.postId || ids.value
    elConfirm('确认', `是否确认删除用户编号为"${postIds}"的数据项`)
      .then(() => {
        return deleteReq(postIds)
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
    postList,
    showSearch,
    tableHeadColumns,
    handleExport
  }
}
