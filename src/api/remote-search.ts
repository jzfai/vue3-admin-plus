import request from '@/utils/mock-axios-req'

export function searchUser(name) {
  return request({
    url: '/vue3-admin-plus/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/vue3-admin-plus/transaction/list',
    method: 'get',
    params: query
  })
}
