import request from '@/utils/axios-req'
import settings from '@/settings'

//获取用户信息
export const userInfoReq = () => {
  return new Promise((resolve) => {
    const reqConfig = {
      url: 'getInfo',
      data:{platformId: settings.platformId},
      method: 'get'
    }
    request(reqConfig).then((res) => {
      resolve(res?.data)
    })
  })
}

//获取路由信息
export const getRouterReq = () => {
  return new Promise((resolve) => {
    const reqConfig = {
      url: 'getMenu',
      params: { platformId: settings.platformId },
      reqLoading: false,
      method: 'get'
    }
    request(reqConfig).then(({ data }) => {
      resolve(data)
    })
  })
}

//登录
export const loginReq = (subForm) => {
  return request({
    url: 'login',
    data: subForm,
    method: 'post',
    isNotTipErrorMsg: true
  })
}

// 注册方法
export const register = (data) => {
  return request({
    url: 'rbac/register',
    method: 'post',
    data
  })
}

//退出登录
export const loginOutReq = () => {
  return request({
    url: 'rbac/logout',
    method: 'post'
  })
}

//获取验证码
export const getCodeImg = () => {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    data:{
      width:100,
      height:50
    },
    method: 'get'
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data
  })
}
//查询列表
export const listReq = (query) => {
  return request({
    url: '/system/user/list',
    method: 'post',
    data: query
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/user/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return request({
    url: `/system/user/${id}`,
    method: 'delete'
  })
}

//导入
export const importReq = (updateSupport, data) => {
  return request({
    url: `/system/user/importData?updateSupport=${updateSupport}`,
    method: 'post',
    data
  })
}

//导出
export const exportReq = (reqConfig) => {
  return request({
    url: `/system/user/export`,
    method: 'post',
    responseType: 'blob',
    params: Object.assign(reqConfig)
  })
}

//模板下载
export const downloadTemplateReq = () => {
  return request({
    url: `system/user/importTemplate`,
    method: 'post'
  })
}
// 新增和编辑接口

//新增
export const addUser = (data) => {
  return request({
    url: `/system/user`,
    data,
    method: 'post'
  })
}
//更新
export const updateUser = (data) => {
  return request({
    url: `/system/user`,
    data,
    method: 'put'
  })
}
//详情
export const getUser = (id) => {
  return request({
    url: `/system/user/${id}`,
    method: 'get'
  })
}

//详情
export const getUserInfo = () => {
  return request({
    url: `/system/user`,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: '/system/user/authRole',
    method: 'put',
    params: data
  })
}

// 查询部门下拉树结构
export function deptTreeSelect() {
  return request({
    url: '/system/user/deptTree',
    method: 'get'
  })
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: `/system/user/authRole/${userId}`,
    method: 'get'
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data
  })
}
