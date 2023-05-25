//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq = (query) => {
  //查询列表
  return request({
    url: '/system/post/list',
    method: 'get',
    params: query
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/post/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return request({
    url: `/system/post/${id}`,
    method: 'delete'
  })
}

//导出
export const exportReq = (reqConfig) => {
  return request({
    url: `/system/post/export`,
    responseType: 'blob',
    method: 'post',
    params: Object.assign(reqConfig, { responseType: 'blob' })
  })
}

/**
 * 新增编辑页面接口
 *Post新增
 */
export const addPost = (data) => {
  return request({
    url: `/system/post`,
    data,
    method: 'post'
  })
}

/**
 *Post更新
 @param {*} id 详情id
 */
export const updatePost = (data) => {
  return request({
    url: `/system/post`,
    method: 'put',
    data
  })
}

/**
 *Post详情
 * @param {*} data json数据
 */
export const getPost = (id) => {
  return request({
    url: `/system/post/${id}`,
    method: 'get'
  })
}
