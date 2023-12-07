//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq = (query) => {
  //查询列表
  return request({
    url: '/system/sysDictData/list',
    method: 'post',
    reqLoading: false,
    data: query
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/sysDictData/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return request({
    url: `/system/sysDictData/${id}`,
    method: 'delete'
  })
}

//导出
export const exportReq = (reqConfig) => {
  return request({
    url: `/system/sysDictData/export`,
    responseType: 'blob',
    method: 'post',
    params: Object.assign(reqConfig, { responseType: 'blob' })
  })
}

/**
 * 新增编辑页面接口
 *Dict新增
 */
export const addDict = (data) => {
  return request({
    url: `/system/sysDictData`,
    data,
    method: 'post'
  })
}

/**
 *Dict更新
 @param {*} id 详情id
 */
export const updateDict = (data) => {
  return request({
    url: `/system/sysDictData`,
    method: 'put',
    data
  })
}

/**
 *Dict详情
 * @param {*} data json数据
 */
export const getDict = (id) => {
  return request({
    url: `/system/sysDictData/${id}`,
    method: 'get'
  })
}
