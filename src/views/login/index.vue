<!--suppress ALL -->
<template>
  <div class="login-container columnCC">
    <el-form ref="refLoginForm" :model="loginForm" class="login-form">
      <h3 class="title">Hugo后台管理系统</h3>
      <el-form-item prop="username" :rules="formRules.isNotNull('用户名不能为空')">
        <el-input v-model="loginForm.username" type="text" size="large" auto-compconste="off" placeholder="账号">
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" :rules="formRules.isNotNull('password')">
        <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            auto-compconste="off"
            placeholder="密码"
            @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="captchaEnabled" prop="code" :rules="formRules.isNotNull('验证码不能为空')">
        <el-input
            v-model="loginForm.code"
            size="large"
            auto-compconste="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" @click="getCode" />
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
        <div v-if="register" style="float: right">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2022-{{ new Date().getFullYear() }} Hugo All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBasicStore } from '@/store/basic'
import { elMessage, useElement } from '@/hooks/use-element'
import { getCodeImg, loginReq } from '@/api/user'
/* listen router change and set the query  */
const { settings } = useBasicStore()
//element valid
const formRules = useElement().formRules
//form
const loginForm = reactive({
  username: 'admin',
  password: '123456',
  rememberMe: 'true',
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
        elMessage('登录成功')
        basicStore.setToken(`Bearer ${data?.token}`)
        recordLoginInfo()
        router.push('/')
      })
      .catch((err) => {
        tipMessage.value = err?.msg
      })
      .finally(() => {
        subLoading.value = false
      })
}
/*
 *  password show or hidden
 * */
const passwordType = ref('password')
const refPassword = ref(null)
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

const codeUrl = ref('')
const loading = ref(false)
// 验证码开关
const captchaEnabled = ref(true)
// 注册开关
const register = ref(false)
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

const recordLoginInfo = () => {
  //remember password
  if (loginForm.rememberMe) {
    localStorage.setItem('usename', loginForm.username)
    localStorage.setItem('password', loginForm.password)
    localStorage.setItem('rememberMe', loginForm.rememberMe)
  } else {
    localStorage.setItem('usename', '')
    localStorage.setItem('password', '')
    localStorage.setItem('rememberMe', '')
  }
}

//show lgoin info
const showLoginInfo = () => {
  //reshow password
  loginForm.username = localStorage.getItem('usename') || loginForm.usename
  loginForm.password = localStorage.getItem('password') || loginForm.password
  loginForm.rememberMe = localStorage.getItem('rememberMe') || loginForm.rememberMe
}

onBeforeMount(() => {
  showLoginInfo()
  getCode()
})
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  height: 100vh;
  width: 100%;
  background-color: #2d3a4b;
}

//错误提示信息
.tip-message {
  color: #e4393c;
  height: 30px;
  margin-top: -12px;
  font-size: 12px;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  constter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>

<style lang="scss"></style>
