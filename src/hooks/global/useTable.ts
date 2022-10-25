import { ref } from 'vue'
import { AxiosReqTy } from '~/common'
import momentMini from 'moment-mini'

const useTableExample = (searchForm, selectPageReq) => {
  /*define ref*/
  const tableListData = ref([])
  const totalPage = ref(0)
  const pageNum = ref(1)
  const pageSize = ref(10)

  //列表请求
  const tableListReq = ({ url, method, isParams }: AxiosReqTy) => {
    const data = Object.assign(JSON.parse(JSON.stringify(searchForm)), {
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    Object.keys(data).forEach((fItem) => {
      if (['', null, undefined, NaN].includes(data[fItem])) delete data[fItem]
      if (method === 'get') {
        if (data[fItem] instanceof Array) delete data[fItem]
        if (data[fItem] instanceof Object) delete data[fItem]
      }
    })
    const reqConfig = {
      url,
      method,
      data,
      isParams
    }
    axiosReq(reqConfig).then(({ data }) => {
      tableListData.value = data?.records
      totalPage.value = data?.total
    })
  }
  /**
   * time range dill
   * @param timeArr choose the time
   * @param searchForm
   * @author 熊猫哥
   * @date 2022/9/25 14:02
   */
  const dateRangePacking = (timeArr) => {
    if (timeArr && timeArr.length === 2) {
      searchForm.startTime = timeArr[0]
      //取今天23点
      searchForm.endTime = momentMini(timeArr[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
    } else {
      searchForm.startTime = ''
      searchForm.endTime = ''
    }
  }

  const handleCurrentChange = (val) => {
    pageNum.value = val
    selectPageReq()
  }
  const handleSizeChange = (val) => {
    pageSize.value = val
    selectPageReq()
  }
  const resetPageReq = () => {
    pageNum.value = 1
    selectPageReq()
  }

  /*多选*/
  const multipleSelection = ref([])
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }
  /*批量删除*/
  const { elMessage, elConfirm } = useElement()
  const multiDelBtnDill = (reqConfig) => {
    let rowDeleteIdArr: Array<string> = []
    let deleteNameTitle = ''
    rowDeleteIdArr = multipleSelection.value.map((mItem: { name: string; id: string }) => {
      deleteNameTitle = deleteNameTitle + mItem.name + ','
      return mItem.id
    })
    if (rowDeleteIdArr.length === 0) {
      elMessage('表格选项不能为空', 'warning')
      return
    }
    const stringLength = deleteNameTitle.length - 1
    elConfirm('删除', `您确定要删除【${deleteNameTitle.slice(0, stringLength)}】吗`).then(() => {
      const data = rowDeleteIdArr
      axiosReq({
        data,
        method: 'DELETE',
        bfLoading: true,
        ...reqConfig
      }).then(() => {
        elMessage('删除成功')
        resetPageReq()
      })
    })
  }
  //单个删除
  const tableDelDill = (row, reqConfig) => {
    elConfirm('确定', `您确定要删除【${row.name}】吗？`).then(() => {
      axiosReq(reqConfig).then(() => {
        resetPageReq()
        elMessage(`【${row.name}】删除成功`)
      })
    })
  }

  return {
    pageNum,
    pageSize,
    totalPage,
    tableListData,
    tableListReq,
    dateRangePacking,
    multipleSelection,
    handleSelectionChange,
    handleCurrentChange,
    handleSizeChange,
    resetPageReq,
    multiDelBtnDill,
    tableDelDill
  }
}

export const useTable = useTableExample

export default useTableExample
