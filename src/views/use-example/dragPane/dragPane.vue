<template>
  <splitpanes class="default-theme" horizontal :push-other-panes="false">
    <pane>
      <div class="item" style="background-color: #fe5308">1</div>
    </pane>
    <pane>
      <splitpanes :push-other-panes="false">
        <pane>
          <div class="item" style="background-color: #fefe34">2</div>
        </pane>
        <pane>
          <div class="item" style="background-color: #cfea2b">3</div>
        </pane>
        <pane>
          <div class="item" style="background-color: #66b032">4</div>
        </pane>
      </splitpanes>
    </pane>
    <pane>
      <div class="item" style="background-color: #0492ce">5</div>
    </pane>
  </splitpanes>
</template>

<script setup>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: #333;
  font-size: 5em;
  width: 100%;
  height: 100%;
}
</style>
