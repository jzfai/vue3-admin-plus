<template>
  <div class="login-container columnCE">
    <div class="login-hero">
      <img src="@/assets/layout/login.svg" :alt="settings.title" />
    </div>
    <el-form ref="refLoginForm" class="login-form" :model="loginForm" :rules="formRules">
      <div class="title-container">
        <h3 class="title text-center">{{ settings.title }}</h3>
      </div>
      <el-form-item prop="username" :rules="formRules.isNotNull('user not empty')">
        <span class="svg-container">
          <ElSvgIcon name="User" :size="14" />
        </span>
        <el-input v-model="loginForm.username" placeholder="username" />
        <!--占位-->
      </el-form-item>
      <el-form-item prop="password" :rules="formRules.isNotNull('password not empty')">
        <span class="svg-container">
          <ElSvgIcon name="Lock" :size="14" />
        </span>
        <el-input
          :key="passwordType"
          ref="refPassword"
          v-model="loginForm.password"
          :type="passwordType"
          name="password"
          placeholder="password"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item v-if="captchaEnabled" prop="code" :rules="formRules.isNotNull('验证码不能为空')">
        <div class="rowSC" style="width: 100%">
          <span class="svg-container">
            <svg-icon icon-class="validCode" class="el-input__icon input-icon" />
          </span>
          <el-input v-model="loginForm.code" placeholder="验证码" @keyup.enter="handleLogin" />

          <img v-if="codeUrl" :src="codeUrl" class="login-code-img" @click="getCode" />
        </div>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
        true-label="true"
        false-label="false"
      >
        记住密码
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <div v-if="register" style="float: right">
        <router-link class="link-type" :to="'/register'">立即注册</router-link>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBasicStore } from '@/store/basic'
import { elMessage, useElement } from '@/hooks/use-element'
import { getCodeImg, loginReq } from '@/api/user'
import { useConfigStore } from '@/store/config.ts'
/* listen router change and set the query  */
const { settings } = useBasicStore()
//element valid
const formRules = useElement().formRules
//form
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  uuid: ''
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
    subLoading.value = true
    if (valid) loginFunc()
  })
}
const router = useRouter()
const basicStore = useBasicStore()

const loginFunc = () => {
  loginReq(loginForm)
    .then(({ data }) => {
      const { code, msg } = data
      const errCode = '500'
      if (errCode.includes(code)) {
        elMessage(msg, 'error')
        loginForm.code = ''
        getCode()
      } else {
        elMessage('登录成功')
        basicStore.setToken(`Bearer ${data?.token}`)
        recordLoginInfo()
        router.push('/')
      }
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
// 注册开关
const register = ref(true)
const redirect = ref(undefined)

//获取code
const getCode = () => {
  getCodeImg().then(({ data }) => {
    if (data.captchaEnabled) {
      captchaEnabled.value = true
      codeUrl.value = `data:image/gif;base64,${data.img}`
      loginForm.uuid = data.uuid
    }
  })
}

const { rememberMe, username, password, setLoginInfo } = useConfigStore()

const recordLoginInfo = () => {
  //remember password
  if (loginForm.rememberMe) {
    setLoginInfo(loginForm)
  } else {
    loginForm.username = ''
    loginForm.password = ''
    loginForm.rememberMe = false
    setLoginInfo(loginForm)
  }
}

const showLoginInfo = () => {
  loginForm.username = username
  loginForm.password = password
  loginForm.rememberMe = rememberMe
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
  showLoginInfo()
  getCode()
  reloadCode()
})
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
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
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
