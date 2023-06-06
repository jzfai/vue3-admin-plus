//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq = (query) => {
  console.log('query', query)
  //查询列表
  return request({
    url: '/system/platform/list',
    method: 'post',
    data: query
  })
}

//查询全部数据
export const selectPlatformAll = () => {
  //查询列表
  return request({
    url: '/system/platform/filterPlatformByUserId',
    method: 'get'
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/platform/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return request({
    url: `/system/platform/${id}`,
    method: 'delete'
  })
}

//导出
export const exportReq = (reqConfig) => {
  return request({
    url: `system/platform/export`,
    responseType: 'blob',
    method: 'post',
    params: Object.assign(reqConfig, { responseType: 'blob' })
  })
}

/**
 * 新增编辑页面接口
 *Platform新增
 */
export const addPlatform = (data) => {
  return request({
    url: `/system/platform`,
    data,
    method: 'post'
  })
}

/**
 *Platform更新
 @param {*} id 详情id
 */
export const updatePlatform = (data) => {
  return request({
    url: `/system/platform`,
    method: 'put',
    data
  })
}

/**
 *Platform详情
 * @param {*} data json数据
 */
export const getPlatform = (id) => {
  return request({
    url: `/system/platform/${id}`,
    method: 'get'
  })
}
