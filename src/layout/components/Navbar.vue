<template>
  <div class="navbar rowBC">
    <div class="rowSC">
      <hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb class="breadcrumb-container" />
    </div>
    <!--nav title-->
    <div v-if="settings.showNavbarTitle" class="heardCenterTitle">{{ settings.title }}</div>
    <div v-if="settings.ShowDropDown" class="right-menu rowSC">
      <ScreenFull />
      <SizeSelect />
      <LangSelect />
      <el-dropdown trigger="click" size="default">
        <div class="avatar-wrapper">
          <img src="@/assets/layout/animation-image.gif" class="user-avatar" />
          <CaretBottom style="width: 1em; height: 1em; margin-left: 4px" />
          <!--el-icon-x  is  destructed-->
          <!--<i class="el-icon-caret-bottom" />-->
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/jzfai/vue3-admin-template">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://juejin.cn/post/7036302298435289095">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <!--<el-dropdown-item>修改密码</el-dropdown-item>-->
            <el-dropdown-item divided @click="loginOut">login out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import SizeSelect from '@/components/SizeSelect/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'

import { CaretBottom } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import { computed, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
const store = useStore()
let settings = computed(() => {
  return store.state.app.settings
})
const opened = computed(() => {
  return store.state.app.sidebar.opened
})
const toggleSideBar = () => {
  store.commit('app/M_toggleSideBar')
}
/*
 * 退出登录
 * */
const loginOut = () => {
  store.dispatch('user/logout').then(() => {
    // ElMessage({ message: '退出登录成功', type: 'success' })
    // record the back point
    //此处reload清空路由和重置部分状态
    location.reload()
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

//logo
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  cursor: pointer;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  cursor: pointer;
  margin-right: 40px;
}
</style>
