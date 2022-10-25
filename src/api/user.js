import request from '@/utils/axiosReq'

export function loginReq(data) {
  return request({
    url: '/basis-func/user/loginValid',
    data,
    method: 'post',
    bfLoading: false,
    isParams: true,
    isAlertErrorMsg: false
  })
}

export function getInfoReq(plateFormId) {
  return request({
    url: '/basis-func/user/getUserInfo',
    bfLoading: false,
    data: { plateFormId },
    isParams: true,
    method: 'post',
    isAlertErrorMsg: false
  })
}

export function logoutReq() {
  return request({
    url: '/basis-func/user/loginOut',
    method: 'post'
  })
}
