<template>
  <div class="app-container scroll-y">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template #default="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template #default="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="Author" width="110" align="center">
        <template #default="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template #default="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="110" align="center">
        <template #default="scope">
          <el-tag :type="statusFilter(scope.row.status)">{{ statusFilter(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template #default="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getList } from '@/api/table'
const statusFilter = (status) => {
  const statusMap = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}
const state = reactive({
  list: null,
  listLoading: true
})

onBeforeMount(() => {
  fetchData()
})

const fetchData = () => {
  state.listLoading = true
  getList().then((response) => {
    console.log('response', response)
    state.list = response.data?.data.items
    state.listLoading = false
  })
}
//导出属性到页面中使用
let { list, listLoading } = toRefs(state)
</script>

<style scoped lang="scss"></style>
