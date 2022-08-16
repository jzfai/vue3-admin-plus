<template>
  <div class="login-container columnCC">
    <div class="login-bg">
      <img src="@/assets/layout/login-bg.svg" :alt="settings.title" />
    </div>
    <div class="login-pane">
      <img src="@/assets/layout/login-top.svg" class="login-top" :alt="settings.title" />
      <img src="@/assets/layout/login-front.svg" class="login-front" :alt="settings.title" />
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
        <el-button
          :loading="loading"
          type="warning"
          class="login-btn"
          size="default"
          round
          @click.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
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
$bg: #ffe4b5;
$dark_gray: #333;
$gray: #999;
$light_gray: #eee;
.login-container {
  height: 100vh;
  position: relative;
  overflow-y: hidden;
  width: 100%;
  background-color: $bg;
  :deep(.el-input__wrapper) {
    background-color: transparent;
    box-shadow: none;
    border-radius: 50px;
  }
  :deep(.el-form-item) {
    border: 1px solid #e0e0e0;
    background: #fff;
    border-radius: 50px;
    color: #999;
    .el-form-item__content {
      position: relative;
    }
    .el-form-item__error {
      padding-left: 40px;
    }
  }
  :deep(.el-input input) {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 50px;
    padding: 10px 5px 10px 35px;
    color: #999;
    height: 42px; //此处调整item的高度
    caret-color: #999;
  }
  //hiden the input border
  :deep(.el-input__inner) {
    box-shadow: none !important;
  }
  .login-pane {
    position: relative;
    .login-top,
    .login-front {
      position: absolute;
      top: 0;
      left: 50%;
    }
    .login-top {
      z-index: 0;
      transform: translateY(-85%) translateX(-50%);
    }
    .login-front {
      z-index: 11;
      transform: translateY(-35%) translateX(-50%);
    }
  }
  .login-form {
    width: 340px;
    padding: 40px 30px;
    background: #fff;
    box-shadow: 0px 4px 16px rgba(158, 105, 25, 0.15);
    border-radius: 8px;
    position: relative;
    z-index: 10;
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
.login-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  margin-bottom: 10px;
  --el-button-bg-color: #fbcf47;
  --el-button-border-color: #fbcf47;
  --el-button-text-color: #8f5c0e;
  --el-button-hover-text-color: #8f5c0e;
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
