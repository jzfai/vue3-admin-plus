<template>
  <div class="app-container scroll-y">
    <el-upload
      ref="uploadRef"
      action=""
      multiple
      :on-change="handleOnChange"
      :auto-upload="false"
      accept=".xls, .xlsx"
      :show-file-list="false"
    >
      <template #trigger>
        <el-button type="primary" class="mb-1">
          <el-icon><Upload /></el-icon>上传excel</el-button
        >
      </template>
    </el-upload>
    <el-table v-loading="listLoading" :data="list" border highlight-current-row >
      <el-table-column v-for="item of headers" :key="item" :prop="item" :label="item">
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { Upload } from "@element-plus/icons-vue";
import { toRefs, reactive } from "vue";
import { importsExcel } from "@/utils/excel";
import { ElMessage } from "element-plus";

const state = reactive({
  list: null,
  headers: null,
  listLoading: false,
});

const handleOnChange = (uploadFile) => {
  state.listLoading = true;
  importsExcel(uploadFile)
    .then((res) => {
      state.list = res.tableData;
      state.headers = res.headers;
      state.listLoading = false;
    })
    .catch((err) => {
      console.log(err);
      state.listLoading = false;
    });
};

//导出属性到页面中使用
let { list, headers, listLoading } = toRefs(state);
</script>

<style scoped lang="scss"></style>
