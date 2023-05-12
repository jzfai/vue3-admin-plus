<template>
  <div class="icon-body">
    <el-input v-model="iconName" clearable placeholder="请输入图标名称" @clear="filterIcons" @input="filterIcons">
      <template #suffix><ElSvgIcon name="Search" /></template>
    </el-input>
    <div class="icon-list">
      <div v-for="(item, index) in iconList" :key="index" class="icon-item" @click="selectedIcon(item)">
        <svg-icon :icon-class="item" />
        <span class="ml-4px">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import icons from './requireIcons'

const iconName = ref('')
const iconList = ref(icons)
const emit = defineEmits(['selected'])

function filterIcons() {
  iconList.value = icons
  if (iconName.value) {
    iconList.value = icons.filter((item) => item.includes(iconName.value))
  }
}

function selectedIcon(name) {
  emit('selected', name)
  document.body.click()
}

function reset() {
  iconName.value = ''
  iconList.value = icons
}

defineExpose({
  reset
})
</script>

<style lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
}
.icon-list {
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
}
.icon-item {
  margin-bottom: 10px;
  cursor: pointer;
  width: 150px;
}
</style>
