import sortableImp from 'sortablejs'
export default function (importData, className) {
  //拖拽
  onMounted(() => {
    nextTick(() => {
      rowDrop()
    })
  })
  const rowDrop = () => {
    // 获取到element-ui封装的表格标签
    const tbody = document.querySelector(` .${className} tbody`)
    sortableImp.create(tbody, {
      animation: 180,
      delay: 0,
      onEnd({ newIndex, oldIndex }) {
        const currRow = importData.splice(oldIndex, 1)[0]
        importData.splice(newIndex, 0, currRow)
      }
    })
  }
  return {
    rowDrop
  }
}
