<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script setup>
import Chart from './components/LineMarker.vue'
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
