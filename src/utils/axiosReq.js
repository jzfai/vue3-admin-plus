import store from '@/store'
import axios from 'axios'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { getToken, setToken } from '@/utils/auth'
let requestData
let loadingE

const service = axios.create()
// request
service.interceptors.request.use(
  (req) => {
    // token setting
    req.headers['AUTHORIZE_TOKEN'] = getToken()
    /* download file*/
    if (req.isDownLoadFile) {
      req.responseType = 'blob'
    }
    /* upload file*/
    if (req.isUploadFile) {
      req.headers['Content-Type'] = 'multipart/form-data'
    }
    if (req.bfLoading) {
      loadingE = ElLoading.service({
        lock: true,
        text: '数据载入中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      })
    }
    /*
     *params会拼接到url上,such as  "a=1&b=2"
     * */
    if (req.isParams) {
      req.params = req.data
      req.data = {}
    }
    //save req for res to using
    requestData = req
    return req
  },
  (err) => {
    Promise.reject(err)
  }
)
//response
service.interceptors.response.use(
  (res) => {
    if (requestData.afHLoading && loadingE) {
      loadingE.close()
    }
    // direct return, when download file
    if (requestData.isDownLoadFile) {
      return res.data
    }
    const { flag, msg, code, isNeedUpdateToken, updateToken } = res.data
    //update token
    if (isNeedUpdateToken) {
      setToken(updateToken)
    }
    if (flag) {
      return res.data
    } else {
      if (code === 403) {
        ElMessageBox.confirm('请重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      if (requestData.isAlertErrorMsg) {
        ElMessage({
          message: msg,
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(msg)
      } else {
        return res.data
      }
    }
  },
  (err) => {
    if (loadingE) loadingE.close()
    ElMessage({
      message: err,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(err)
  }
)

export default function axiosReq({
  url,
  data,
  method,
  isParams,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  baseURL,
  timeout,
  isAlertErrorMsg
}) {
  return service({
    url: url,
    method: method ?? 'post',
    data: data ?? {},
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? true,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg: isAlertErrorMsg ?? true,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL, // 设置基本基础url
    timeout: timeout ?? 15000 // 配置默认超时时间
  })
}
