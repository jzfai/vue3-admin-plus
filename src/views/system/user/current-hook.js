import { ElMessage } from 'element-plus'
import { deleteReq, exportReq } from '@/api/user'
import { downLoadTemp } from '@/hooks/use-common'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const userList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref('')
const refElTable = ref(null)
const refExport = ref(null)
export const handleImport = () => {
  refExport.value.showModal()
}
const tableHeadColumns = ref([
  { prop: 'userName', label: '用户名称', minWidth: 100, isTemplate: false, showColumn: true },
  { prop: 'nickName', label: '用户昵称', minWidth: 100, isTemplate: false, showColumn: true },
  { prop: 'deptName', label: '部门', minWidth: 100, isTemplate: false, showColumn: true },
  { prop: 'postNames', label: '岗位', minWidth: 100, isTemplate: false, showColumn: true },
  { prop: 'phonenumber', label: '手机号码', minWidth: 120, isTemplate: false, showColumn: true },
  { prop: 'status', label: '状态', minWidth: 80, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'createTime', label: '创建时间', minWidth: 140, isTemplate: false, align: 'center', showColumn: true }
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.userId)
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
    const userIds = row.userId || ids.value
    elConfirm(`是否确认删除用户编号为"${userIds}"的数据项`)
      .then(() => {
        return deleteReq(userIds)
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
    userList,
    showSearch,
    tableHeadColumns,
    handleExport
  }
}
