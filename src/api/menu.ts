//查询列表页面接口
import request from '@/utils/axios-req'

export const listMenuReq = (query) => {
  //查询列表
  return request({
    url: '/system/menu/list',
    method: 'get',
    reqLoading: false,
    params: query
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/menu/${id}`,
    method: 'delete'
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
export const addMenu = (data) => {
  return request({
    url: `/system/menu`,
    data,
    method: 'post'
  })
}
//更新
export const updateMenu = (data) => {
  return request({
    url: `/system/menu`,
    data,
    method: 'put'
  })
}
//详情
export const getMenu = (id) => {
  return request({
    url: `/system/menu/${id}`,
    method: 'get'
  })
}
//上级菜单
export const parentIdReq = (data) => {
  return request({
    url: `/system/menu/list`,
    data,
    method: 'get'
  })
}
