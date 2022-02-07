<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>关系图谱</span>
          <el-button class="button" type="text" @click="restart">刷新</el-button>
        </div>
      </template>
      <div ref="boxRef" class="contain">
        <!--        d3画布-->
        <div id="d3" :style="style"></div>
        <!--        提示-->
        <transition name="fade">
          <div v-show="state.showTip" class="tip" :style="{ left: state.tip.left, top: state.tip.top }">
            <span>名称：{{ state.tip.content.id }}</span>
            <span>类型：{{ state.tip.content.type || '无' }}</span>
          </div>
        </transition>
      </div>
    </el-card>
    <!--    节点详情-->
    <NodeDetail :detail="state" :node-type="nodeType"></NodeDetail>
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRef } from 'vue'
import useData from './useDatas'
import useD3 from './useD3'
import data from '@/api/data.json'
import * as d3 from 'd3'
import comentUtil from '@/utils/comentUtil'
import NodeDetail from '@/views/use-example/d3/component/NodeDetail.vue'

export default {
  components: { NodeDetail },
  setup(props, context) {
    // 定义基本数据
    const state = reactive({
      types: 'CLNode',
      drawer: false,
      height: 600,
      data: {},
      tip: {
        left: 0,
        top: 0,
        content: {}
      },
      showTip: false
    })

    // 定义refs
    const boxRef = ref(null)

    const { nodeType } = useData(state) // 导入详情模块
    const { chart } = useD3() // 导入d3模块

    // 容器样式
    const style = reactive({
      width: '100%',
      height: state.height + 'px',
      background: '#fffefb'
    })

    onMounted(() => {
      init()
      window.onresize = comentUtil.debounce(function () {
        obj.svg.remove() // 移除画布
        init() // 重新初始化
      }, 50)
    })

    // 获取容器宽度
    const getWidth = () => {
      if (boxRef.value) {
        let width = boxRef.value.clientWidth
        style.width = width.value + 'px'
        return width
      }
    }

    // 定义d3相关的对象，用于后续操作
    let obj = reactive({})
    // 初始化d3
    const init = () => {
      let width = getWidth()
      obj = chart('#d3', {
        width,
        height: state.height,
        data,
        nodeClick: function () {
          // 节点点击事件
          const data = d3.select(this).datum()
          state.data = data
          state.types = data.type
          state.drawer = true
        },
        nodeMouseOver: function (e) {
          // 鼠标移入节点事件
          d3.select(this).style('cursor', 'pointer')
          const data = d3.select(this).datum()
          const { layerX, layerY } = e
          state.tip.content = data
          state.showTip = true
          state.tip.left = layerX + 8 + 'px'
          state.tip.top = layerY + 8 + 'px'
        },
        nodMouseOut: function (e) {
          // 鼠标移出节点事件
          state.showTip = false
        }
      })
    }

    // 刷新force
    const restart = () => {
      obj.simulation.alpha(1).restart()
    }

    return {
      style,
      state,
      boxRef,
      nodeType,
      restart
    }
  }
}
</script>

<style scoped lang="scss">
.box-card {
  min-height: 500px;

  .contain {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .tip {
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      width: 100px;
      border-radius: 2px;
      color: rgba(255, 255, 255, 0.82);
      padding: 5px;
      font-size: 12px;
    }
  }
}
</style>
<style>
.el-dialog__body {
  padding: 0 !important;
}
</style>
