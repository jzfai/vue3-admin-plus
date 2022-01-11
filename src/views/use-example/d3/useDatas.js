import { reactive, watch, ref } from 'vue'

export default function useUserRepositories(state) {
  const gkNode = reactive([{
    title: '工况ID',
    field: 'id'
  }, {
    title: '车辆编号',
    field: 'bh'
  }, {
    title: '数据时间',
    field: 'sj'
  }, {
    title: '臂架电流',
    field: 'dl'
  }, {
    title: '图片',
    field: 'img'
  }, {
    title: '视频',
    field: 'video'
  },{
    title: '节点颜色',
    field: 'ys'
  }])

  const gzNode = reactive([{
    title: '故障Id',
    field: 'id'
  }, {
    title: '问题类别',
    field: 'lb'
  }, {
    title: '故障现象',
    field: 'xx'
  }, {
    title: '故障处理方法',
    field: 'ff'
  }, {
    title: '失效形式',
    field: 'xs'
  }, {
    title: 'Url',
    field: 'url'
  }, {
    title: '颜色',
    field: 'ys'
  }])

  const BOMNode = reactive([{
    title: 'BOM ID',
    field: 'id'
  }, {
    title: '级别',
    field: 'lb'
  }, {
    title: '编码',
    field: 'xx'
  }, {
    title: '部件名称',
    field: 'ff'
  }, {
    title: 'url地址',
    field: 'xs'
  }, {
    title: '节点颜色',
    field: 'url'
  }])

  const DLNode = reactive([{
    title: '电流评价ID',
    field: 'id'
  }, {
    title: '电流评价',
    field: 'lb'
  }, {
    title: '节点颜色',
    field: 'ys'
  }])

  const CLNode = reactive([{
    title: '车辆编码',
    field: 'id'
  }, {
    title: '车辆名称',
    field: 'mc'
  }, {
    title: '节点颜色',
    field: 'ys'
  }])

  const node = {
    gkNode,
    gzNode,
    BOMNode,
    DLNode,
    CLNode
  }


  const nodeType = ref([])
  watch(() => state.types, (newValue) => {
    nodeType.value = node[newValue]
  }, {immediate: true})

  return {
    nodeType
  }
}
