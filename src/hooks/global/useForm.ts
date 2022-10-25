import { ElMessageBox } from 'element-plus'
import momentMini from 'moment-mini'
const useFormExample = (subForm) => {
  // 正整数
  const upZeroInt = (rule, value, callback, msg) => {
    if (!value) {
      callback(new Error(`${msg}不能为空`))
    }
    if (/^\+?[1-9]\d*$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}输入有误`))
    }
  }

  // 正整数（包括0）
  const zeroInt = (rule, value, callback, msg) => {
    if (!value) {
      callback(new Error(`${msg}不能为空`))
    }
    if (/^\+?[0-9]\d*$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}输入有误`))
    }
  }

  // 金额
  const money = (rule, value, callback, msg) => {
    if (!value) {
      callback(new Error(`${msg}不能为空`))
    }
    if (/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}输入有误`))
    }
  }

  // 手机号
  const phone = (rule, value, callback, msg) => {
    if (!value) {
      callback(new Error(`${msg}不能为空`))
    }
    if (/^0?1[0-9]{10}$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}输入有误`))
    }
  }
  // 邮箱
  const email = (rule, value, callback, msg) => {
    if (!value) {
      callback(new Error(`${msg}不能为空`))
    }
    if (/(^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4}))$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}`))
    }
  }
  //校验对象
  const formRules = {
    //非空
    isNull: (msg) => [{ required: false, message: `${msg}`, trigger: 'blur' }],
    isNotNull: (msg) => [{ required: true, message: `${msg}`, trigger: 'blur' }],
    // 正整数
    upZeroInt: (msg) => [
      { required: true, validator: (rule, value, callback) => upZeroInt(rule, value, callback, msg), trigger: 'blur' }
    ],
    // 正整数（包括0）
    zeroInt: (msg) => [
      { required: true, validator: (rule, value, callback) => zeroInt(rule, value, callback, msg), trigger: 'blur' }
    ],
    // 金额
    money: (msg) => [
      { required: true, validator: (rule, value, callback) => money(rule, value, callback, msg), trigger: 'blur' }
    ],
    // 手机号
    phone: (msg) => [
      { required: true, validator: (rule, value, callback) => phone(rule, value, callback, msg), trigger: 'blur' }
    ],
    // 邮箱
    email: (msg) => [
      { required: true, validator: (rule, value, callback) => email(rule, value, callback, msg), trigger: 'blur' }
    ]
  }

  /*时间相关*/
  const timeState = reactive({
    startEndArr: [],
    //禁止选择之前的时间
    datePickerOptions: {
      disabledDate: (time) => {
        return time.getTime() < Date.now() - 86400000
      }
    }
  })
  /**
   * 回显数据
   * @param detailData  详情数据
   * @param subForm  回显的form
   * @author 熊猫哥
   * @date 2022/9/25 13:03
   */
  const reshowData = (detailData, subForm) => {
    Object.keys(detailData).forEach((fItem) => {
      Object.keys(subForm).forEach((sItem) => {
        if (fItem === sItem) {
          subForm[sItem] = detailData[sItem]
        }
      })
    })
  }
  /*上传文件相关*/
  const chooseFileName = ref(null)
  const fileUpload = (refSettingFile) => {
    return new Promise<{ fileUrl: string }>((resolve) => {
      const formData = new FormData()
      formData.append('file', refSettingFile.files[0])
      axiosReq({
        url: '/basis-func/upload/file',
        timeout: 30000,
        data: formData,
        method: 'post',
        bfLoading: true,
        isUploadFile: true
      })
        .then(({ data }) => {
          const { path } = data
          // 存储文件名称
          const filename = refSettingFile.value
          chooseFileName.value = filename.slice(filename.lastIndexOf('\\') + 1)
          const fileUrl = `${import.meta.env.VITE_APP_IMAGE_URL}/${path}`
          refSettingFile.value = ''

          resolve({ fileUrl })
        })
        .catch(() => {
          chooseFileName.value = null
          refSettingFile.value = ''
        })
    })
  }

  //取消
  const handleCancel = () => {
    ElMessageBox.confirm('现在离开将不会保留您的操作，是否离开？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      useVueRouter().routerBack()
    })
  }

  /**
   * time range dill
   * @param timeArr choose the time
   * @param searchForm
   * @author 熊猫哥
   * @date 2022/9/25 14:02
   */
  const dateRangePacking = (timeArr) => {
    if (timeArr && timeArr.length === 2) {
      subForm.startTime = timeArr[0]
      //取今天23点
      subForm.endTime = momentMini(timeArr[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
    } else {
      subForm.startTime = ''
      subForm.endTime = ''
    }
  }

  return {
    formRules,
    ...toRefs(timeState),
    reshowData,
    fileUpload,
    chooseFileName,
    handleCancel
  }
}

export const useForm = useFormExample

export default useFormExample
