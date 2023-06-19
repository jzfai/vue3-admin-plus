//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq = (query) => {
  //查询列表
  return request({
    url: '/system/oss/list',
    method: 'get',
    params: query
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/system/oss/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return request({
    url: `/system/oss/${id}`,
    method: 'delete'
  })
}

export const exportReq = () => {}
