import request from '@/utils/axios-req'
import settings from '@/settings'

export const userInfoReq = () => {
  return new Promise((resolve) => {
    const reqConfig = {
      url: 'rbac/getInfo',
      data:{platformId: settings.platformId},
      method: 'get'
    }
    request(reqConfig).then(({ data }) => {
      resolve(data)
    })
  })
}

//登录
export const loginReq = (subForm) => {
  return request({
    url: 'rbac/login',
    data: subForm,
    method: 'post',
    isNotTipErrorMsg: true
  })
}
// 注册方法
export const register = (data) => {
  return request({
    url: 'rbac/register',
    method: 'post',
    data
  })
}
//获取验证码
export const getCodeImg = () => {
  return request({
    url: 'rbac/getCode',
    params:{width:85,height:50},
    method: 'get'
  })
}
