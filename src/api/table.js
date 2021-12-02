import request from 'axios'

export function getList(params) {
  return request({
    url: '/vue3-admin-plus/table/list',
    method: 'get',
    params
  })
}
