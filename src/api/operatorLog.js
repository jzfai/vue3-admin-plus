//查询列表页面接口
import request from '@/utils/axios-req'

export const listReq=(query)=> {
//查询列表
  return request({
    url: '/monitor/operatorLog/list',
    method: 'get',
    params: query
  })
}

//删除
export const deleteReq=(id)=> {
  return request({
    url: `/monitor/operatorLog/${id}`,
    method: 'delete',
  })
}

//批量删除
export const multiDeleteReq=(id)=> {
  return request({
    url: `/monitor/operatorLog/${id}`,
    method: 'delete',
  })
}


//导出
export const exportReq=(reqConfig)=> {
  return request({
    url: `monitor/operatorLog/export`,
    responseType: 'blob',
    method: 'post',
    params: Object.assign(reqConfig, { responseType: 'blob' })
  })
}

