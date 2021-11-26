const mixin = {
  data() {
    return {
      /* router跳转相关*/
      queryParamsMixin: null
    }
  },
  created() {
    // 通用获取页面参数
    if (this.$route?.query?.params) {
      this.queryParamsMixin = JSON.parse(this.$route.query.params)
    }
  },
  methods: {
    // vue router跳转
    routerPushMixin(name, params) {
      let data = {}
      if (params) {
        data = {
          params: JSON.stringify(params)
        }
      } else {
        data = {}
      }
      this.$router.push({
        name: name,
        query: data
      })
    },
    routerReplaceMixin(name, params) {
      let data = {}
      if (params) {
        data = {
          params: JSON.stringify(params)
        }
      } else {
        data = {}
      }
      this.$router.replace({
        name: name,
        query: data
      })
    },
    routerBackMixin() {
      this.$router.go(-1)
    }
  }
}

export default mixin
