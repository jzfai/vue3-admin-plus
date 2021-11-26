<template>
  <div>
    <el-button v-permission="['admin']">showing when then role of admin</el-button>
    <el-button v-permission="['editor']">editor</el-button>
    <el-button v-permission="['admin', 'editor']">editor and admin</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
