//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq = (query) => {
  //查询列表
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}

//导出
export const exportReq = (reqConfig) => {
  return request({
    url: `/system/dept/export`,
    responseType: 'blob',
    method: 'post',
    params: Object.assign(reqConfig, { responseType: 'blob' })
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/dept/${id}`,
    method: 'delete'
  })
}

/**
 * 新增编辑页面接口
 *Dept新增
 */
export const addDept = (data) => {
  return request({
    url: `/system/dept`,
    data,
    method: 'post'
  })
}

/**
 *Dept更新
 @param {*} id 详情id
 */
export const updateDept = (data) => {
  return request({
    url: `/system/dept`,
    method: 'put',
    data
  })
}

/**
 *Dept详情
 * @param {*} data json数据
 */
export const getDept = (id) => {
  return request({
    url: `/system/dept/${id}`,
    method: 'get'
  })
}
