import { ElMessage } from 'element-plus'
import { deleteReq } from '@/api/ossConfig'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const ossConfigList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref()
const refElTable = ref()
const refExport = ref()
export const handleImport = () => {
  refExport.value.showModal()
}

const tableHeadColumns = ref([
  { prop: 'configKey', label: '配置key', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'endpoint', label: '访问站点', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'domain', label: '自定义域名', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'bucketName', label: '桶名称', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'prefix', label: '前缀', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'region', label: '域', minWidth: 150, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'accessPolicy', label: '桶权限类型', minWidth: 150, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'status', label: '状态', minWidth: 150, isTemplate: true, align: 'center', showColumn: true }
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.ossConfigId)
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
  const handleDelete = (row) => {
    const ossConfigIds = row.ossConfigId || ids.value
    elConfirm('确认', `是否确认删除用户编号为"${ossConfigIds}"的数据项`)
      .then(() => {
        return deleteReq(ossConfigIds)
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
    ossConfigList,
    showSearch,
    tableHeadColumns
  }
}
