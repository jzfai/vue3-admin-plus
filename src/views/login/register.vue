<template>
  <div class="login-container columnCC">
    <div class="login-bg">
      <img src="@/assets/layout/login-bg.svg" :alt="settings.title" />
    </div>
    <div class="login-pane">
      <img src="@/assets/layout/login-top.svg" class="login-top" :alt="settings.title" />
      <img src="@/assets/layout/login-front.svg" class="login-front" :alt="settings.title" />
      <el-form ref="refLoginForm" class="login-form" :model="registerForm" :rules="formRules">
        <div class="title-container">
          <h3 class="title text-center">{{ settings.title }}</h3>
        </div>
        <el-form-item prop="username" :rules="formRules.isNotNull('user not empty')">
          <span class="svg-container">
            <ElSvgIcon name="User" :size="14" />
          </span>
          <el-input v-model="registerForm.username" placeholder="username" />
          <!--占位-->
        </el-form-item>
        <el-form-item prop="password" :rules="formRules.isNotNull('password not empty')">
          <span class="svg-container">
            <ElSvgIcon name="Lock" :size="14" />
          </span>
          <el-input
            :key="passwordType"
            ref="refPassword"
            v-model="registerForm.password"
            :type="passwordType"
            name="password"
            placeholder="password"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <!--   确认密码     -->
        <el-form-item prop="confirmPassword" :rules="formRules.isNotNull('password not empty')">
          <span class="svg-container">
            <ElSvgIcon name="Lock" :size="14" />
          </span>
          <el-input
            :key="passwordType"
            ref="refPassword"
            v-model="registerForm.confirmPassword"
            :type="passwordType"
            name="confirmPassword"
            placeholder="confirmPassword"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item v-if="captchaEnabled" prop="code" :rules="formRules.isNotNull('验证码不能为空')">
          <div class="rowBC" style="width: 100%">
            <span class="svg-container">
              <svg-icon icon-class="validCode" class="el-input__icon input-icon" />
            </span>
            <el-input v-model="registerForm.code" placeholder="验证码" @keyup.enter="handleLogin" />
            <img v-if="codeUrl" :src="codeUrl" class="login-code-img" @click="getCode" />
          </div>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
            <span v-if="!loading">注 册</span>
            <span v-else>注 册 中...</span>
          </el-button>
        </el-form-item>
        <div style="float: right">
          <router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBasicStore } from '@/store/basic'
import { elMessage, useElement } from '@/hooks/use-element'
import { getCodeImg, loginReq, register } from '@/api/user'
import { useConfigStore } from '@/store/config.ts'
/* listen router change and set the query  */
const { settings } = useBasicStore()
//element valid
const formRules = useElement().formRules
//form
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  code: '',
  uuid: '',
  userType: 'sys_user'
})
const state = reactive({
  otherQuery: {},
  redirect: undefined
})
const route = useRoute()
const getOtherQuery = (query) => {
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

/*password show or hidden*/
const passwordType = ref('password')
const refPassword = ref()
const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    refPassword.value.focus()
  })
}
/*
 *  login relative
 * */
const subLoading = ref(false)
//tip message
const tipMessage = ref('')
//sub form
const refLoginForm = ref(null)
const handleLogin = () => {
  refLoginForm.value.validate((valid) => {
    if (registerForm.password !== registerForm.confirmPassword) {
      elMessage('两次密码输入不一致', 'warning')
      return
    }
    subLoading.value = true
    if (valid) loginFunc()
  })
}
const router = useRouter()
const basicStore = useBasicStore()

const loginFunc = () => {
  register(registerForm)
    .then(({ data }) => {
      elMessage('注册成功')
      router.push('/login')
    })
    .catch((err) => {
      tipMessage.value = err?.msg
    })
    .finally(() => {
      subLoading.value = false
    })
}

const codeUrl = ref('')
const loading = ref(false)
// 验证码开关
const captchaEnabled = ref(true)

const redirect = ref(undefined)

//获取code
const getCode = () => {
  getCodeImg().then(({ data }) => {
    if (data.captchaEnabled) {
      captchaEnabled.value = true
      codeUrl.value = `data:image/gif;base64,${data.img}`
      registerForm.uuid = data.uuid
    }
  })
}

const { rememberMe, username, password, setLoginInfo } = useConfigStore()

const recordLoginInfo = () => {
  //remember password
  if (registerForm.rememberMe) {
    setLoginInfo(registerForm)
  } else {
    registerForm.username = ''
    registerForm.password = ''
    registerForm.rememberMe = false
    setLoginInfo(registerForm)
  }
}

const showLoginInfo = () => {
  registerForm.username = username
  registerForm.password = password
  registerForm.rememberMe = rememberMe
}
//定时刷新验证码
let timeInterId
const reloadCode = () => {
  timeInterId = setInterval(() => {
    getCode()
  }, 30000)
}

onUnmounted(() => {
  clearInterval(timeInterId)
})
onBeforeMount(() => {
  // showLoginInfo()
  getCode()
  reloadCode()
})
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
    width: 380px;
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

/*验证码*/
.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.input-icon {
  height: 39px;
  width: 14px;
  margin-left: 0px;
}
.login-code-img {
  cursor: pointer;
  width: 92px;
  height: 44px;
  border-top-right-radius: 25%;
  border-bottom-right-radius: 25%;
}
</style>
