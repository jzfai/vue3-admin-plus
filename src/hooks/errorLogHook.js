//https://blog.csdn.net/weixin_34865745/article/details/113992767
import request from '@/utils/axiosReq'
import setting from '@/settings'
import bus from '@/utils/bus'
export default function (app) {
  //type judge
  // base type  using type of
  // Reference type using instance of
  // recommend to reading https://www.jianshu.com/p/ddc7f189d130
  const checkNeed = () => {
    const env = import.meta.env.VITE_APP_ENV
    let { errorLog } = setting
    if (typeof errorLog === 'string') {
      return env === errorLog
    }
    if (errorLog instanceof Array) {
      return errorLog.includes(env)
    }
    return false
  }
  if (checkNeed()) {
    app.config.errorHandler = (err) => {
      request({
        url: '/ty-user/errorCollection/insert',
        data: { pageUrl: window.location.href, errorLog: `${err.message}---${err.stack}` },
        method: 'post',
        bfLoading: false,
        isAlertErrorMsg: true
      }).then(() => {
        bus.emit('reloadErrorPage', { a: 111 })
      })
    }
  }
}
