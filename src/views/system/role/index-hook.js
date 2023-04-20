import { deleteReq, exportReq } from '@/api/role'
import { downLoadTemp } from '@/hooks/use-common'
import { ElMessage } from 'element-plus'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const roleList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref('')
const refElTable = ref(null)
const refExport = ref(null)
export const handleImport = () => {
  refExport.value.showModal()
}

let tableHeadColumns = ref([
  { prop: 'roleName', label: '角色名称', minWidth: 100, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'roleKey', label: '权限字符', minWidth: 100, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'roleSort', label: '显示顺序', minWidth: 100, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'status', label: '状态', minWidth: 80, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'createTime', label: '创建时间', minWidth: 140, isTemplate: false, align: 'center', showColumn: true }
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.roleId)
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
    const roleIds = row.roleId || ids.value
    elConfirm(`是否确认删除用户编号为"${roleIds}"的数据项`)
      .then(() => {
        return deleteReq(roleIds)
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
    roleList,
    showSearch,
    tableHeadColumns,
    handleExport
  }
}
