//https://blog.csdn.net/weixin_34865745/article/details/113992767
import request from '@/utils/axiosReq'
import setting from '@/settings'
import bus from '@/utils/bus'
import pack from '../../package.json'
let errorLogReq = (errLog) => {
  request({
    url: '/ty-user/errorCollection/insert',
    data: {
      pageUrl: window.location.href,
      errorLog: errLog,
      browserType: navigator.userAgent,
      version: pack.version
    },
    method: 'post',
    bfLoading: false,
    isAlertErrorMsg: true
  }).then(() => {
    bus.emit('reloadErrorPage', {})
  })
}

export default function () {
  /*
   * type judge
   * base type  using 'type of'
   * Reference type using 'instance of'
   * recommend to reading https://www.jianshu.com/p/ddc7f189d130
   * */
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
    window.addEventListener(
      'error',
      ({ error, target }) => {
        if (target.outerHTML) {
          //img error collection
          let errLog = `${JSON.stringify(target.outerHTML)}`
          errorLogReq(errLog)
        } else {
          let errLog = `${error.stack.substr(0, 300)}`
          errorLogReq(errLog)
        }
      },
      //use Event capture  to collection  img error
      true
    )
  }
}
