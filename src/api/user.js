import request from '@/utils/axiosReq'

export function loginReq(data) {
  return request({
    url: '/ty-user/user/loginValid',
    data,
    method: 'post',
    bfLoading: false,
    isParams: true,
    isAlertErrorMsg: false
  })
}

export function getInfoReq() {
  return request({
    url: '/ty-user/user/getUserInfo',
    bfLoading: false,
    method: 'post'
  })
}

export function logoutReq() {
  return request({
    url: '/ty-user/user/loginOut',
    method: 'post'
  })
}
