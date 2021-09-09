<template>
  <el-table :data="tableData">
    <el-table-column v-for="item in tableColums" :key="item.prop" :prop="item.prop" :label="item.title">
        <template #default="scope">
            {{scope.row[item.prop]}}
        </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      tableData: [
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
      ],
      tableColums: [
        {
          prop: 'date',
          title: '日期'
        },
        {
          prop: 'name',
          title: '姓名'
        },
        {
          prop: 'address',
          title: '地址'
        }
      ]
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang=""></style>
