import { ElLoading, ElNotification, ElMessage, ElMessageBox } from 'element-plus'
const useElementExample = () => {
  /* element form校验相关*/
  // 密码必须为6-18位字母、数字
  const passwordValid = (rule, value, callback) => {
    if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
      callback(new Error('6-18位字母、数字'))
    } else {
      callback()
    }
  }
  // 大于0的整数
  const upZeroInt = (rule, value, callback) => {
    if (!/^\+?[1-9]\d*$/.test(value)) {
      callback(new Error('大于0的整数'))
    } else {
      callback()
    }
  }
  const upZeroIntCanNull = (rule, value, callback) => {
    if (!value) {
      callback()
    } else {
      if (!/^\+?[1-9]\d*$/.test(value)) {
        callback(new Error('大于0的整数'))
      } else {
        callback()
      }
    }
  }
  const validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      callback()
    }
  }

  const state = reactive({
    /* table*/
    tableData: [],
    rowDeleteIdArr: [],
    loadingId: null,
    /* 表单*/
    formModel: {},
    subForm: {},
    searchForm: {},
    /* 表单校验*/
    formRules: {
      isNotNull: [{ required: true, message: '该字段不能为空', trigger: 'blur' }],
      isNotNullSecond: [{ required: true, message: '不能为空', trigger: 'blur' }],
      mLength8: [
        { required: true, message: '该字段不能为空', trigger: 'blur' },
        { max: 8, message: '最长为8个字符', trigger: 'blur' }
      ],
      minLength7: [
        { required: true, message: '该字段不能为空', trigger: 'blur' },
        { min: 7, message: '最小7个字符', trigger: 'blur' }
      ],
      length17: [
        { required: true, message: '该字段不能为空', trigger: 'blur' },
        { min: 17, max: 17, message: '长度为17个字符', trigger: 'blur' }
      ],
      desc: [{ validator: validatePass, trigger: 'blur' }],
      upZeroInt: [{ validator: upZeroInt, trigger: 'blur' }],
      upZeroIntCanNull: [{ validator: upZeroIntCanNull, trigger: 'blur' }],
      passwordValid: [{ validator: passwordValid, trigger: 'blur' }]
    },
    /* 时间packing相关*/
    datePickerOptions: {
      disabledDate: (time) => {
        return time.getTime() < Date.now() - 86400000
      }
    },
    startEndArr: [],
    startEndArrSub: [],
    /* dialog相关*/
    dialogTitle: '添加',
    detailDialog: false,
    isDialogEdit: false,
    dialogVisible: false,
    tableLoading: false,
    /* 级联相关*/
    cascaderKey: 1,
    SetKesDept: {
      value: 'id',
      expandTrigger: 'hover',
      label: 'label',
      children: 'children'
    },
    SetKesDeptNoStrictly: {
      value: 'id',
      expandTrigger: 'hover',
      label: 'label',
      children: 'children',
      checkStrictly: true
    },
    cascaderOptionsOne: [],
    cascaderOptions: [],
    /* 树相关*/
    treeData: [],
    defaultProps: {
      children: 'children',
      label: 'label'
    }
  })

  /* 级联*/
  const cascaderKey = ref(null)
  const casHandleChange = () => {
    // 解决目前级联选择器搜索输入报错问题
    cascaderKey.value += cascaderKey.value
  }
  /*
   * 通知弹框
   * message：通知的内容
   * type：通知类型
   * duration：通知显示时长（ms）
   * */
  const elMessage = (message, type) => {
    ElMessage({
      showClose: true,
      message: message || '成功',
      type: type || 'success',
      center: false
    })
  }
  /*
   * loading加载框
   * 调用后通过 loadingId.close() 进行关闭
   * */
  let loadingId = null
  const elLoading = () => {
    loadingId = ElLoading.service({
      lock: true,
      text: '数据载入中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.1)'
    })
  }
  /*
   * 提示
   * message: 提示内容
   * type：提示类型
   * title：提示标题
   * duration：提示时长（ms）
   * */
  const elNotify = (message, type, title, duration) => {
    ElNotification({
      title: title || '提示',
      type: type || 'success',
      message: message || '请传入提示消息',
      position: 'top-right',
      duration: duration || 2500,
      offset: 40
    })
  }
  /*
    确认弹框(没有取消按钮)
  * title:提示的标题
  * message:提示的内容
  * return Promise
  * */
  const elConfirmNoCancelBtn = (title, message) => {
    return ElMessageBox({
      message: message || '你确定要删除吗',
      title: title || '确认框',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showCancelButton: false,
      type: 'warning'
    })
  }
  /*
   * 确认弹框
   * title:提示的标题
   * message:提示的内容
   * return Promise
   * */
  const elConfirm = (title, message) => {
    return ElMessageBox({
      message: message || '你确定要删除吗',
      title: title || '确认框',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  }

  return {
    casHandleChange,
    elMessage,
    elLoading,
    elNotify,
    elConfirmNoCancelBtn,
    elConfirm,
    ...toRefs(state)
  }
}

export const useElement = useElementExample

export default useElementExample
