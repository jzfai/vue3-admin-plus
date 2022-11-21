<template>
  <el-dropdown id="size-select" trigger="click" type="primary" @command="handleSetSize">
    <svg-icon icon-class="size" style="width: 18px; height: 18px" class="mr-12px" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in sizeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="size === item.value"
        >
          <h3 class="pt-10px pb-10px font-sizePx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { storeToRefs } from 'pinia/dist/pinia'
import SvgIcon from '@/icons/SvgIcon.vue'
import { useConfigStore } from '@/store/config'
const state = reactive({
  sizeOptions: [
    { label: 'Large ', value: 'large' },
    { label: 'Default ', value: 'default' },
    { label: 'Small', value: 'small' }
  ]
})
const configStore = useConfigStore()
const { size } = storeToRefs(configStore)
const handleSetSize = (size) => {
  configStore.setSize(size)
}
const { sizeOptions } = toRefs(state)
</script>

<style scoped lang="scss"></style>
