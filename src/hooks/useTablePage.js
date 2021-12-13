import { onMounted, ref } from 'vue'
export default function (selectPageReq) {
  /*分页*/
  const pageNum = ref(1)
  const pageSize = ref(10)
  const handleCurrentChange = (val) => {
    pageNum.value = val
    selectPageReq()
  }
  const handleSizeChange = (val) => {
    pageSize.value = val
    selectPageReq()
  }
  onMounted(() => {})
  return {
    pageNum,
    pageSize,
    handleCurrentChange,
    handleSizeChange
  }
}
