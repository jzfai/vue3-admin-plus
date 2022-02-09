<template>
  <div class="mt-2">
    sub-children
    <div>{{ title }}</div>
  </div>
  <!--  Teleport  https://www.jianshu.com/p/1ecf5006b1ae-->

  <div class="mt-2">Teleport</div>
  <!--
     teleport container
     attention: the container must have when the teleport render
     -->
  <div id="modal-container"></div>

  <!--  to container-->
  <teleport v-if="modalOpen" to="#modal-container">
    <div class="modal">
      <div>
        to container
        <el-button @click="modalOpen = false">Close</el-button>
      </div>
    </div>
  </teleport>
  <!--  to body-->
  <!--  <teleport v-if="modalOpen" to="body">-->
  <!--    <div>to body</div>-->
  <!--  </teleport>-->
  <el-button @click="showModalOpen">showModalOpen</el-button>
</template>

<script setup>
//provide and inject using
let title = inject('title')

const modalOpen = ref(false)

const showModalOpen = () => {
  modalOpen.value = true
}
</script>

<style scoped lang="scss"></style>
