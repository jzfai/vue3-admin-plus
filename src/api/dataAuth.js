// 新增和编辑接口
import request from '@/utils/axios-req'
//新增
export const addDataAuth = (data) => {
  return request({
    url: `/system/role/dataScope`,
    data,
    reqLoading: false,
    method: 'post'
  })
}
//更新
export const updateDataAuth = (data) => {
  return request({
    url: `/system/role/dataScope`,
    data,
    method: 'put'
  })
}
//详情
export const getDataAuth = (id) => {
  return request({
    url: `/system/role/deptTree/${id}`,
    method: 'get'
  })
}

// 查询部门下拉树结构
// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId) {
  return request({
    url: `/system/role/deptTree/${roleId}`,
    method: 'get'
  })
}
