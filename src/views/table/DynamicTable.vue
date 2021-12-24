<template>
  <div class="scroll-y">
    <el-checkbox-group v-model="checkedList" @change="handleChangeChecked">
      <el-checkbox v-for="item in tableColums" :key="item.prop" :label="item.prop">{{ item.title }}</el-checkbox>
    </el-checkbox-group>
    <el-table :data="tableData">
      <template v-for="item in tableColums" :key="item.prop">
        <el-table-column v-if="item.show" :prop="item.prop" :label="item.title">
          <template #default="scope">
            {{ scope.row[item.prop] }}
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
interface TableColums {
  [key: string]: Column
}
interface Column {
  prop: string
  title: string
  show: boolean
}
interface TableDataItem {
  date?: string
  name?: string
  address?: string
}
export default defineComponent({
  setup() {
    const state = reactive({
      checkedList: ['date', 'name', 'address']
    })
    const tableData: TableDataItem[] = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }
    ])
    const tableColums: TableColums = reactive({
      date: {
        prop: 'date',
        title: '日期',
        show: true
      },
      name: {
        prop: 'name',
        title: '姓名',
        show: true
      },
      address: {
        prop: 'address',
        title: '地址',
        show: true
      }
    })
    const handleChangeChecked = (checkedList: string[]) => {
      for (let key in tableColums) {
        tableColums[key].show = checkedList.includes(tableColums[key].prop)
      }
    }
    return {
      ...toRefs(state),
      tableColums,
      tableData,
      handleChangeChecked
    }
  }
})
</script>
<style lang=""></style>
