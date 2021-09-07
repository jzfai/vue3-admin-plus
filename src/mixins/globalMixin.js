import { getToken } from '@/utils/auth'
/*
 * 注：所有的混合的属性和方法都以mixin结尾
 * */
const globolMixins = {
  data() {
    /* element form校验相关*/
    // 密码必须为6-18位字母、数字
    let passwordValid = (rule, value, callback) => {
      // mixins {field: "desc", fullField: "desc", type: "string", validator: ƒ}
      // console.log('mixins', rule, value)
      if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
        callback(new Error('6-18位字母、数字'))
      } else {
        callback()
      }
    }
    // 大于0的整数
    let upZeroInt = (rule, value, callback) => {
      // mixins {field: "desc", fullField: "desc", type: "string", validator: ƒ}
      // console.log('mixins', rule, value)
      if (!/^\+?[1-9]\d*$/.test(value)) {
        callback(new Error('大于0的整数'))
      } else {
        callback()
      }
    }
    let upZeroIntCanNull = (rule, value, callback) => {
      // mixins {field: "desc", fullField: "desc", type: "string", validator: ƒ}
      // console.log('mixins', rule, value)
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
      tableMixinData: [
        {
          value: 1,
          label: '王小虎',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id: 1,
          status: 1
        },
        {
          value: 2,
          label: '王小虎',
          date: '2016-05-03',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄1',
          status: 1,
          id: 2
        }
      ],
      rowDeleteIdArrMixin: [],
      loadingIdMixin: null,
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
      cascaderOptionsMixin: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            }
          ]
        }
      ],
      modalNameMixin: '',
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
      /* 树相关*/
      treeDataMixin: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      /* 文件上传相关*/
      fileListMixin: [],
      chooseFileNameMixin: '',
      /* 多环境配置及token信息*/
      commonValueMixin: '',
      modalShowTitleMixin: '',
      VITE_APP_IMAGE_URL_PRE: '', // 图片前缀地址
      VITE_APP_BASE_URL: '', // 请求的url地址
      VITE_APP_BASE_WS_URL: '', // 请求的url地址
      accessTokenMixin: '', // 请求头的token
      userBaseInfoMixin: {}, // 用户信息
      /* 时间packing相关*/
      datePickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 86400000
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      startEndArrMixin: [],
      startEndArrSubMixin: [],
      /* 时间点相关*/
      todayTimeMixin: '',
      currentTimeMixin: '',
      todayTimeMixinLast: '',
      yesterdayTimeMixin: null,
      beforeThreeDateTimeMixin: '',
      /* dialog相关*/
      dialogTitleMixin: '添加',
      detailDialogMixin: false,
      isDialogEditMixin: false,
      dialogVisibleMixin: false,
      tableLoadingMixin: false,
      /* router跳转相关*/
      queryParamsMixin: null
    }
  },
  computed: {
    // ...mapState('user', ['token', 'userInfo'])
  },
  watch: {},
  created() {
    /* 获取url连接域名，用于多平台迁移*/
    const localUrl = window.location.href.slice(0, window.location.href.indexOf('/', 9) + 1)
    const socketUrl = localUrl.replace(/http|https/gi, 'ws')
    // 读取.env 多坏境里的数据
    this.VITE_APP_IMAGE_URL_PRE = import.meta.env.VITE_APP_BASE_URL
    this.VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL
    this.VITE_APP_BASE_WS_URL =
      import.meta.env.VITE_APP_ENV === 'serve' ? import.meta.env.VITE_APP_BASE_WS_URL : socketUrl
    // 获取token和个人基本信息
    this.accessTokenMixin = getToken()
    this.userBaseInfoMixin = JSON.parse(localStorage.getItem('L_userBaseInfo'))
    /* 获取时间点*/
    this.todayTimeMixin = this.$momentMini().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.currentTimeMixin = this.$momentMini(new Date()).format('YYYY-MM-DD HH:mm:ss')
    this.todayTimeMixinLast = this.$momentMini().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.beforeThreeDateTimeMixin = this.$momentMini().add(-3, 'days').format('YYYY-MM-DD HH:mm:ss')
    this.yesterdayTimeMixin = this.$momentMini().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')
    // 通用获取页面参数
    if (this.$route && this.$route.query && this.$route.query.params) {
      this.queryParamsMixin = JSON.parse(this.$route.query.params)
    }
    // let tableListData=res.data&&res.data.list
    // res.data.list && data
    // let data=[1,2,3,4]
    // let tableListData=res.data.list || data
  },
  mounted() {},
  methods: {
    //判断环境
    isBuildEnvMixin() {
      return import.meta.env.VITE_APP_ENV === 'build'
    },
    // vue router跳转
    /*
     * router入栈跳转
     * path：跳转的路径名（name）
     * params: 跳转传递的参数（json格式）
     * */
    routerPushMixin(path, params) {
      let data = {}
      if (params) {
        data = {
          params: JSON.stringify(params)
        }
      } else {
        data = {}
      }
      this.$router.push({
        name: path,
        query: data
      })
    },
    routerReplaceMixin(path, params) {
      let data = {}
      if (params) {
        data = {
          params: JSON.stringify(params)
        }
      } else {
        data = {}
      }
      this.$router.replace({
        name: path,
        query: data
      })
    },
    routerBackMixin() {
      this.$router.go(-1)
    },
    /* table和分页*/
    handleSizeChangeMixin(val) {
      this.pageSizeMixin = val
      this.selectPageReq()
    },
    handleCurrentChangeMixin(val) {
      // console.log(`当前页: ${val}`)
      this.pageNumMixin = val
      this.selectPageReq()
    },
    /* dialog*/

    /* 级联*/
    casHandleChangeMixin(valueArr) {
      // 解决目前级联选择器搜索输入报错问题
      ++this.cascaderKey
    },

    /* 数组操作相关api*/
    /*
     * 根据key名称过滤数组
     * arr:数组
     * key：数值对象总的key
     * */
    filterArrMixin(arr, key) {
      const hash = {}
      return arr.reduce((ss, item) => {
        hash[item[key]] ? '' : (hash[item[key]] = true && ss.push(item))
        return ss
      }, [])
    },
    /*
     * 清空空的参数项
     * objParam：传入的{}参数
     * */
    clearParamsIsNullMixin(objParam) {
      const obj = Object.keys(objParam)
      obj.forEach((fItem) => {
        if (objParam[fItem] === '' || objParam[fItem] === null || objParam[fItem] === undefined) delete objParam[fItem]
      })
      return objParam
    },
    /*
     * 通知弹框
     * message：通知的内容
     * type：通知类型
     * duration：通知显示时长（ms）
     * */
    elMessageMixin(message, type, duration) {
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
      return new Promise((resolve, reject) => {
        this.$confirm(message || '你确定要删除吗', title || '确认框', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: false,
          type: 'warning'
        })
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    /*
     * 确认弹框
     * title:提示的标题
     * message:提示的内容
     * return Promise
     * */
    elConfirmMixin(title, message) {
      return new Promise((resolve, reject) => {
        this.$confirm(message || '你确定要删除吗', title || '确认框', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    handleChangeMixin(file, fileListMixin) {
      console.log('file, fileListMixin', file, fileListMixin)
      this.fileListMixin = fileListMixin
    },
    goUploadFileMixin() {
      this.$refs.refSettingFile.click()
    },
    beforeCloseDetailModal() {
      this.detailDialogMixin = false
    },
    /*
    /*
    * time:传入的时间ms
    * return Promise
    * */
    sleepMixin(time) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          resolve()
        }, time)
      })
    },
    resetDataMixin(form) {
      Object.keys(form).forEach((sItem) => {
        form[sItem] = ''
      })
    },
    reshowDataMixin(row, form) {
      Object.keys(row).forEach((fItem) => {
        Object.keys(form).forEach((sItem) => {
          if (fItem === sItem) {
            // console.log('复制了', sItem)
            form[sItem] = row[sItem]
          }
        })
      })
    }
  }
}

export default globolMixins
