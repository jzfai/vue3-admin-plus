import { ElMessage } from 'element-plus'
import { deleteReq } from '@/api/menu'
import {orderFunc} from "@/hooks/use-menu";
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const menuList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref('')
const refElTable = ref(null)
const refExport = ref(null)
export const handleImport = () => {
  refExport.value.showModal()
}

const tableHeadColumns = ref([
  { prop: 'menuName', label: '菜单名称', minWidth: 120, isTemplate: false, align: 'left', showColumn: true },
  { prop: 'icon', label: '图标', minWidth: 100, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'status', label: '状态', minWidth: 60, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'redirect', label: '重定向', minWidth: 80, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'routeName', label: '路由名字', minWidth: 80, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'visible', label: '显示状态', minWidth: 80, isTemplate: true, align: 'center', showColumn: true },
  { prop: 'metaExtra', label: 'meta参数', minWidth: 130, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'orderNum', label: '排序', minWidth: 40, isTemplate: false, align: 'center', showColumn: true },
  { prop: 'createTime', label: '创建时间', minWidth: 130, isTemplate: false, align: 'center', showColumn: true }
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.menuId)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}
export const colChange = (heardColsArr) => {
  tableHeadColumns.value = heardColsArr
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

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  }

  const childrenListMap = {}
  const nodeIds = {}
  const tree = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return orderFunc(tree,"orderNum");
}

export const currentHook = (queryParams, getList) => {
  // const handleExport = () => {
  //   exportReq(queryParams).then((res) => {
  //     downLoadTemp(res)
  //   })
  // }
  const handleDelete = (row) => {
    const menuIds = row.menuId
    elConfirm(`是否确认删除用户编号为"${menuIds}"的数据项`)
      .then(() => {
        return deleteReq(menuIds)
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
    menuList,
    showSearch,
    tableHeadColumns
  }
}
