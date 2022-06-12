<template>
  <div>
    <div class="mb-1">拖动表格进行排序</div>
    <el-table class="sort-table" :data="tableData" style="width: 100%" row-key="date">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup>
/*
 * 1. 安装sortableJs并导入
 * 2.<el-table>上添加  class="sort-table" row-key="date"
 * 注意：row-key 为tableData值中唯一键如：id,或者name等
 * */

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

//拖拽
onMounted(() => {
  nextTick(() => {
    rowDrop()
  })
})
import Sortable from 'sortableJs'
const rowDrop = () => {
  // 获取到element-ui封装的表格标签
  const tbody = document.querySelector(' .sort-table tbody')
  Sortable.create(tbody, {
    animation: 180,
    delay: 0,
    onEnd({ newIndex, oldIndex }) {
      const currRow = tableData.splice(oldIndex, 1)[0]
      tableData.splice(newIndex, 0, currRow)
    }
  })
}
</script>

<style scoped lang="scss"></style>
