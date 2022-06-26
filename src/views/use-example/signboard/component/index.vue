<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <div :id="headerText" class="board-column-content">
      <div v-for="(item, index) in list" :key="index" class="board-item">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import SortableJsExample from 'sortablejs'
const props = defineProps({
  headerText: {
    type: String,
    default: 'Header'
  },

  list: {
    type: Array,
    default() {
      return []
    }
  }
})
//拖拽
onMounted(() => {
  console.log(props.list)
  nextTick(() => {
    rowDrop()
  })
})
const rowDrop = () => {
  new SortableJsExample(document.querySelector('#' + props.headerText), {
    group: {
      name: 'group',
      put: true
    }
  })
}
</script>
<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      cursor: pointer;
      width: 100%;
      height: 64px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
