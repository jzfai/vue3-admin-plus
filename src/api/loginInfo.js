//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq = (query) => {
  //查询列表
  return request({
    url: '/monitor/loginInfo/list',
    method: 'get',
    params: query
  })
}

//删除
export const deleteReq = (id) => {
  return request({
    url: `/monitor/loginInfo/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return request({
    url: `/monitor/loginInfo/${id}`,
    method: 'delete'
  })
}

//导出
export const exportReq = (reqConfig) => {
  return request({
    url: `monitor/loginInfo/export`,
    responseType: 'blob',
    method: 'post',
    params: Object.assign(reqConfig, { responseType: 'blob' })
  })
}

// 解锁用户登录状态
export function unlockLoginInfo(userName) {
  return request({
    url: `/monitor/loginInfo/unlock/${userName}`,
    method: 'get'
  })
}

// 清空登录日志
export function cleanLoginInfo() {
  return request({
    url: '/monitor/loginInfo/clean',
    method: 'delete'
  })
}
