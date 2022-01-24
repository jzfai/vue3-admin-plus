<template>
<!--    抽屉-->
  <el-drawer
    v-model='state.drawer'
    :size='400'
    :title='state.data.id'
  >
    <el-form ref='formRef' label-width='120px' label-position='left'>
      <template v-for='(item,index) in nodeType' :key='index'>
        <el-form-item v-if='item.field === "img"' :label='item.title'>
          <el-link type='primary'  @click='showLargeImage(state.data.data[item.field])'>{{ state.data.data[item.field] }}</el-link>
        </el-form-item>
        <el-form-item v-else-if='item.field === "video"' :label='item.title'>
          <el-link type='primary' @click='showVideo(state.data.data[item.field])'>{{ state.data.data[item.field] }}</el-link>
        </el-form-item>
        <el-form-item v-else-if='item.field === "ys"' :label='item.title'><span
          :style='{width: "20px", height: "20px",background: state.data.color}'></span></el-form-item>
        <el-form-item v-else :label='item.title'><span>{{ state.data.data[item.field] }}</span></el-form-item>
      </template>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  name: 'NodeDetail',
  props: {
    detail: Object,
    nodeType: Array
  },
  emits: ['showLargeImage', 'showVideo'],
  setup(props, {emit}) {
    let state = props.detail
    const showLargeImage = (e) => {
      emit('showLargeImage',e)
    }
    const showVideo = (e) => {
      emit('showVideo',e)
    }
    return {
      state,
      showLargeImage,
      showVideo
    }

  }
}
</script>

<style>
.el-link--inner{
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow:ellipsis;
  width: 250px;
}

</style>
