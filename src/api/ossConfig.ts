//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq = (query) => {
  //查询列表
  return request({
    url: '/system/oss/config/list',
    method: 'get',
    reqLoading: false,
    params: query
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/oss/config/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return request({
    url: `/system/oss/config/${id}`,
    method: 'delete'
  })
}

/**
 * 新增编辑页面接口
 *OssConfig新增
 */
export const addOssConfig = (data) => {
  return request({
    url: `/system/oss/config`,
    data,
    method: 'post'
  })
}

// 对象存储状态修改
export const changeOssConfigStatus = (ossConfigId, status, configKey) => {
  const data = {
    ossConfigId,
    status,
    configKey
  }
  return request({
    url: '/system/oss/config/changeStatus',
    method: 'put',
    data
  })
}

/**
 *OssConfig更新
 @param {*} id 详情id
 */
export const updateOssConfig = (data) => {
  return request({
    url: `/system/oss/config`,
    method: 'put',
    data
  })
}

/**
 *OssConfig详情
 * @param {*} data json数据
 */
export const getOssConfig = (id) => {
  return request({
    url: `/system/oss/config/${id}`,
    method: 'get'
  })
}
