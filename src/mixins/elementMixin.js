const mixin = {
  data() {
    /* element form校验相关*/
    // 密码必须为6-18位字母、数字
    let passwordValid = (rule, value, callback) => {
      if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
        callback(new Error('6-18位字母、数字'))
      } else {
        callback()
      }
    }
    // 大于0的整数
    let upZeroInt = (rule, value, callback) => {
      if (!/^\+?[1-9]\d*$/.test(value)) {
        callback(new Error('大于0的整数'))
      } else {
        callback()
      }
    }
    let upZeroIntCanNull = (rule, value, callback) => {
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
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      /* table*/
      pageNumMixin: 1,
      pageSizeMixin: 10,
      pageTotalMixin: 0,
      tableDataMixin: [],
      rowDeleteIdArrMixin: [],
      loadingIdMixin: null,
      /* 表单*/
      formModelMixin: {},
      subFormMixin: {},
      searchFormMixin: {},
      /* 表单校验*/
      formRulesMixin: {
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
      startEndArrMixin: [],
      startEndArrSubMixin: [],
      /* dialog相关*/
      dialogTitleMixin: '添加',
      detailDialogMixin: false,
      isDialogEditMixin: false,
      dialogVisibleMixin: false,
      tableLoadingMixin: false,
      /* 级联相关*/
      cascaderKeyMixin: 1,
      SetKesDeptMixin: {
        value: 'id',
        expandTrigger: 'hover',
        label: 'label',
        children: 'children'
      },
      SetKesDeptMixinNoStrictlyMixin: {
        value: 'id',
        expandTrigger: 'hover',
        label: 'label',
        children: 'children',
        checkStrictly: true
      },
      SetKesDeptMixinNoStrictly: {
        value: 'id',
        expandTrigger: 'hover',
        label: 'label',
        children: 'children',
        checkStrictly: true
      },
      cascaderOptionsMixinOne: [],
      cascaderOptionsMixin: [],
      /* 树相关*/
      treeDataMixin: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    /* 级联*/
    casHandleChangeMixin() {
      // 解决目前级联选择器搜索输入报错问题
      ++this.cascaderKey
    },
    /*
     * 通知弹框
     * message：通知的内容
     * type：通知类型
     * duration：通知显示时长（ms）
     * */
    elMessageMixin(message, type) {
      type = type || 'success'
      this.$message({
        showClose: true,
        message: message || '成功',
        type: type,
        center: false
      })
    },
    /*
     * loading加载框
     * 调用后通过 this.loadingIdMixin.close() 进行关闭
     * */
    elLoadingMixin() {
      this.loadingIdMixin = this.$loading({
        lock: true,
        text: '数据载入中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      })
    },
    /*
     * 提示
     * message: 提示内容
     * type：提示类型
     * title：提示标题
     * duration：提示时长（ms）
     * */
    elNotifyMixin(message, type, title, duration) {
      type = type || 'success'
      this.$notify[type]({
        title: title || '提示',
        message: message || '请传入提示消息',
        position: 'top-right',
        duration: duration || 2500,
        offset: 40
      })
    },
    /*
      确认弹框(没有取消按钮)
    * title:提示的标题
    * message:提示的内容
    * return Promise
    * */
    elConfirmNoCancelBtnMixin(title, message) {
      return this.$confirm(message || '你确定要删除吗', title || '确认框', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: false,
        type: 'warning'
      }).catch(() => {})
    },
    /*
     * 确认弹框
     * title:提示的标题
     * message:提示的内容
     * return Promise
     * */
    elConfirmMixin(title, message) {
      return this.$confirm(message || '你确定要删除吗', title || '确认框', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }
  }
}

export default mixin
