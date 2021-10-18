<template>
  <el-table :data="list" style="width: 100%; padding-top: 15px">
    <el-table-column label="Order_No" min-width="200">
      <template #default="{ row }">
        {{ row.order_no?.substring(0, 30) }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template #default="scope">¥{{ toThousandFilter(scope.row.price) }}</template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template #default="{ row }">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { transactionList } from '@/api/remote-search'
import { toRefs, reactive, onBeforeMount } from 'vue'

const state = reactive({
  list: []
})
onBeforeMount(() => {
  fetchData()
})
const statusFilter = (status) => {
  const statusMap = {
    success: 'success',
    pending: 'danger'
  }
  return statusMap[status]
}
const toThousandFilter = (num) => {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
const orderNoFilter = (str) => {
  return
}
const fetchData = () => {
  transactionList().then((response) => {
    state.list = response.data.items.slice(0, 8)
  })
}
//导出属性到页面中使用
let { list } = toRefs(state)
</script>

<style scoped lang="scss"></style>
