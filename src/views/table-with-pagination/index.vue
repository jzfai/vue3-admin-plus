<template>
  <div class='demo-wrap'>
    <div class='filter-container'>
      <el-input
        v-model='listQuery.demoName'
        class='filter-item'
        style='width: 200px'
        placeholder='Input name here'
        clearable
      />
      <el-button
        class='filter-item'
        type='primary'
        @click='fetchData'
      >
        Search
      </el-button>
    </div>
    <el-table v-loading='listLoading' :data='list' element-loading-text='Loading' border highlight-current-row>
      <el-table-column align='center' label='No.' width='95'>
        <template #default='scope'>
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label='Name'>
        <template #default='scope'>
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label='Age' width='110' align='center'>
        <template #default='scope'>
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label='Address' align='center'>
        <template #default='scope'>
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show='total > 0'
      v-model:page='listQuery.current'
      v-model:limit='listQuery.size'
      :total='total'
      @pagination='fetchData'
    />
  </div>
</template>

<script setup>
import { toRefs, reactive, onBeforeMount } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import { ElMessage } from 'element-plus'
// Demo: Import your method for fetch list here
// import { getList } from '@/api/table'

const state = reactive({
  listLoading: false,
  list: null,
  total: 0,
  listQuery: {
    demoName: '',
    // The page
    current: 1,
    // How many item you want to fetch at one page
    size: 10
  }
})

onBeforeMount(() => {
  fetchData()
})

const fetchData = () => {
  state.listLoading = true
  // Demo: Define your list after fetch list and stop the loading here
  // getList().then((response) => {
  //   state.list = response.data?.data.items
  //   state.listLoading = false
  // })
  // Delete this Timeout when you write with this file
  ElMessage.success(`Your params: ${JSON.stringify(toRaw(state.listQuery))}`)
  setTimeout(() => {
    state.list = [
      {
        id: 1,
        name: 'Jack',
        age: 18,
        address: 'Street 1'
      },
      {
        id: 2,
        name: 'ponychoker',
        age: 19,
        address: 'Street 2'
      },
      {
        id: 3,
        name: 'Lucky',
        age: 20,
        address: 'Street 3'
      }
    ]
    state.total = 25
    state.listLoading = false
  }, 500)
}

const { listLoading, list, listQuery, total } = toRefs(state)
</script>

<style lang-='scss' scoped>
.demo-wrap {

}
</style>
