<template>
  <div class="board">
    <signboard :key="1" :list="list1" class="kanban todo" header-text="Todo" />
    <signboard :key="2" :list="list2" class="kanban working" header-text="Working" />
    <signboard :key="3" :list="list3" class="kanban done" header-text="Done" />
  </div>
</template>

<script setup>
import signboard from "./component/index.vue";

const list1 = reactive([
  { name: "Mission1", id: 1 },
  { name: "Mission2", id: 2 },
  { name: "Mission3", id: 3 },
  { name: "Mission4", id: 4 },
]);
const list2 = reactive([
  { name: "Mission5", id: 5 },
  { name: "Mission6", id: 6 },
  { name: "Mission7", id: 7 },
  { name: "Mission8", id: 8 },
]);
const list3 = reactive([
  { name: "Mission9", id: 9 },
  { name: "Mission10", id: 10 },
  { name: "Mission11", id: 11 },
  { name: "Mission12", id: 12 },
]);
</script>

<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
