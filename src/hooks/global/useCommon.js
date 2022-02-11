import { getToken } from '@/utils/auth'
import momentMini from 'moment-mini'
export const useCommonExample = () => {
  const state = reactive({
    totalPage: 0,
    searchForm: {},
    /* 文件上传相关*/
    fileList: [],
    chooseFileName: '',
    /* 多环境配置及token信息*/
    commonValue: '',
    modalShowTitle: '',
    VITE_APP_IMAGE_URL_PRE: '', // 图片前缀地址
    VITE_APP_BASE_URL: '', // 请求的url地址
    VITE_APP_BASE_WS_URL: '', // 请求的url地址
    accessToken: '', // 请求头的token
    userBaseInfo: {}, // 用户信息
    /* 时间点相关*/
    todayTime: '',
    currentTime: '',
    todayTimeLast: '',
    yesterdayTime: null,
    beforeThreeDateTime: '',
    startEndArr: [],
    /*dialog*/
    dialogTitle: '',
    dialogVisible: false
  })
  // 读取.env 多坏境里的数据
  state.VITE_APP_IMAGE_URL_PRE = import.meta.env.VITE_APP_BASE_URL
  state.VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL
  // 获取token和个人基本信息
  state.accessToken = getToken()
  /* 获取时间点*/
  state.todayTime = momentMini().startOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.currentTime = momentMini(new Date()).format('YYYY-MM-DD HH:mm:ss')
  state.todayTimeLast = momentMini().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.beforeThreeDateTime = momentMini().add(-3, 'days').format('YYYY-MM-DD HH:mm:ss')
  state.yesterdayTime = momentMini().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')

  /*
   * 清空空的参数项
   * objParam：传入的参数
   * */
  const clearParamsIsNull = (objParam) => {
    const obj = Object.keys(objParam)
    obj.forEach((fItem) => {
      if (objParam[fItem] === '' || objParam[fItem] === null || objParam[fItem] === undefined) delete objParam[fItem]
    })
    return objParam
  }

  /*文件上传*/
  const handleChange = (fileList) => {
    state.fileList = fileList
  }

  const sleep = (time) => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(null)
      }, time)
    })
  }

  return {
    clearParamsIsNull,
    handleChange,
    sleep,
    ...toRefs(state)
  }
}

export const useCommon = useCommonExample

export default useCommonExample
