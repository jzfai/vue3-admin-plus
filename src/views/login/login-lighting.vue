<template>
  <div class="login-container columnCE">
    <div class="login-hero">
      <img src="@/assets/layout/login.svg" :alt="settings.title" />
    </div>
    <el-form ref="refloginForm" class="login-form" :model="formInline" :rules="formRules">
      <div class="title-container">
        <h3 class="title text-center">{{ settings.title }}</h3>
      </div>
      <el-form-item prop="username" :rules="formRules.isNotNull">
        <span class="svg-container">
          <ElSvgIcon name="User" :size="14" />
        </span>
        <el-input v-model="formInline.username" placeholder="用户名(admin)" />
        <!--占位-->
      </el-form-item>
      <el-form-item prop="password" :rules="formRules.isNotNull">
        <span class="svg-container">
          <ElSvgIcon name="Lock" :size="14" />
        </span>
        <el-input
          :key="passwordType"
          ref="refPassword"
          v-model="formInline.password"
          :type="passwordType"
          name="password"
          placeholder="密码(123456)"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="tip-message">{{ tipMessage }}</div>
      <el-button :loading="loading" type="primary" class="login-btn" size="default" @click.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
defineOptions({ name: 'Login' })
import settings from '@/settings'

import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
//element valid
const formRules = useElement().formRules
//form
let formInline = reactive({
  username: 'admin',
  password: '123456'
})
let state = reactive({
  otherQuery: {},
  redirect: undefined
})

/* listen router change  */
const route = useRoute()
let getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

watch(
  () => route.query,
  (query) => {
    if (query) {
      state.redirect = query.redirect
      state.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true }
)

/*
 *  login relative
 * */
let loading = ref(false)
let tipMessage = ref('')

const refloginForm = ref(null)
let handleLogin = () => {
  refloginForm.value.validate((valid) => {
    if (valid) {
      loginReq()
    } else {
      return false
    }
  })
}

//use the auto import from vite.config.js of AutoImport
const router = useRouter()
let loginReq = () => {
  loading.value = true
  const userStore = useUserStore()
  userStore
    .login(formInline)
    .then(() => {
      ElMessage({ message: '登录成功', type: 'success' })
      router.push({ path: state.redirect || '/', query: state.otherQuery })
    })
    .catch((res) => {
      tipMessage.value = res.msg
      useCommon()
        .sleep(30)
        .then(() => {
          loading.value = false
        })
    })
}
/*
 *  password show or hidden
 * */
let passwordType = ref('password')
const refPassword = ref(null)
let showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    refPassword.value.focus()
  })
}
</script>

<style lang="scss" scoped>
$bg: #fbfcff;
$dark_gray: #333;
$gray: #999;
$light_gray: #eee;
.login-container {
  height: 100vh;
  position: relative;
  overflow-y: hidden;
  width: 100%;
  background-color: $bg;
  .login-form {
    width: 360px;
    padding: 40px 30px;
    background: #fff;
    box-shadow: 0px 4px 16px rgba(4, 61, 175, 0.15);
    border-radius: 8px;
    margin-right: 20vw;
    z-index: 10;
    @media screen and (min-width: 769px) and (max-width: 992px) {
      margin-right: 10vw;
    }
    @media only screen and (max-width: 768px) {
      margin-right: auto;
      margin-left: auto;
    }
  }
  .title-container {
    .title {
      font-size: 18px;
      color: $dark_gray;
      margin: 0px auto 25px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
.login-hero {
  width: 40vw;
  position: absolute;
  top: 50%;
  left: 15vw;
  z-index: 0;
  transform: translateY(-50%);
  @media screen and (min-width: 769px) and (max-width: 992px) {
    width: 60vw;
    left: 5vw;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
    left: 0;
  }
  img {
    width: 100%;
  }
}
.svg-container {
  padding-left: 16px;
  color: $gray;
  text-align: center;
  width: 30px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

//错误提示信息
.tip-message {
  color: #e4393c;
  height: 30px;
  margin-top: -12px;
  font-size: 12px;
}

//登录按钮
.login-btn {
  width: 100%;
  margin-bottom: 30px;
}
.show-pwd {
  width: 50px;
  font-size: 16px;
  color: $gray;
  cursor: pointer;
  text-align: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>

<style lang="scss">
//css 样式重置 增加个前缀避免全局污染
.login-container {
  .el-input__wrapper {
    background-color: transparent;
    box-shadow: none;
  }
  .el-form-item {
    border: 1px solid #e0e0e0;
    background: #fff;
    border-radius: 4px;
    color: #999;
    &__content {
      position: relative;
    }
  }
  .el-input input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 10px 5px 10px 35px;
    color: #999;
    height: 42px; //此处调整item的高度
    caret-color: #999;
  }
  //hiden the input border
  .el-input__inner {
    box-shadow: none !important;
  }
}
</style>
