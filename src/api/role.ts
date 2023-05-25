//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq = (query) => {
  //查询列表
  return request({
    url: '/system/role/list',
    method: 'get',
    reqLoading: false,
    params: query
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/role/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return request({
    url: `/system/role/${id}`,
    method: 'delete'
  })
}

//导入
export const importReq = (updateSupport) => {
  return request({
    url: `/system/role/importData?updateSupport=${updateSupport}`,
    method: 'post'
  })
}

//导出
export const exportReq = (reqConfig) => {
  return request({
    url: `/system/role/export`,
    responseType: 'blob',
    method: 'post',
    params: Object.assign(reqConfig, { responseType: 'blob' })
  })
}

//模板下载
export const downloadTemplateReq = () => {
  return request({
    url: `system/role/importTemplate`,
    method: 'post'
  })
}

// 新增和编辑接口

//新增
export const addRole = (data) => {
  return request({
    url: `/system/role`,
    data,
    method: 'post'
  })
}
//更新
export const updateRole = (data) => {
  return request({
    url: `/system/role`,
    data,
    method: 'put'
  })
}
//详情
export const getRole = (id) => {
  return request({
    url: `/system/role/${id}`,
    method: 'get'
  })
}
//菜单权限
export const menuOptionsReq = (data) => {
  return request({
    url: `/system/menu/treeselect`,
    data,
    method: 'get'
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: `/system/menu/roleMenuTreeselect/${roleId}`,
    method: 'get'
  })
}

// 根据平台查询菜单下拉树结构
export function selectMenuListByPlateFormId(platformId) {
  return request({
    url: `/system/menu/selectMenuListByPlateFormId`,
    method: 'get',
    params: { platformId }
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'get',
    params: query
  })
}
// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: '/system/role/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: '/system/role/authUser/cancel',
    method: 'put',
    data
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: '/system/role/authUser/cancelAll',
    method: 'put',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: '/system/role/authUser/selectAll',
    method: 'put',
    params: data
  })
}
