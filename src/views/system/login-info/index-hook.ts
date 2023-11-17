import { deleteReq, exportReq } from '@/api/loginInfo'
import { ElMessage } from 'element-plus'
const single = ref(true)
const multiple = ref(true)
/*table 列表*/
const ids = ref([])
const totalNum = ref(0)
const loading = ref(false)
const loginInfoList = ref([])
const showSearch = ref(true)
const refAddEditModal = ref()
const refElTable = ref()
const refExport = ref()
export const handleImport = () => {
  refExport.value.showModal()
}

const tableHeadColumns = ref([
  { prop: "infoId", label: "访问编号", minWidth: 150,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "userName", label: "用户名称", minWidth: 80,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "ipaddr", label: "地址", minWidth: 100,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "loginLocation", label: "登录地点", minWidth: 150,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "os", label: "操作系统", minWidth: 120,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "browser", label: "浏览器", minWidth: 80,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "status", label: "登录状态", minWidth: 80,isTemplate:true, align: 'center', showColumn: true  },
  { prop: "msg", label: "描述", minWidth: 120,isTemplate:false, align: 'center', showColumn: true  },
  { prop: "loginTime", label: "访问时间", minWidth: 150,isTemplate:false, align: 'center', showColumn: true  },
])
export const handleSelectionChange = (selection) => {
  ids.value = selection.map((item) => item.infoId)
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
    const loginInfoIds = row.infoId || ids.value
    elConfirm('确认',`是否确认删除用户编号为"${loginInfoIds}"的数据项`)
      .then(() => {
        return deleteReq(loginInfoIds)
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
    loginInfoList,
    showSearch,
    tableHeadColumns,
    handleExport
  }
}
