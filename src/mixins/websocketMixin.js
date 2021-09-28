export default {
  data() {
    return {
      /* webSocket推送的数据*/
      webSocket: null,
      webSocketTaskData: {},
      showVehivlesTaskId: null,
      socketReconnectNum: 0, // 不能超过5次
      lockReconnect: false,
      connectSocketUrl: '', // socket连接的url
      connectSocketName: '', // socket连接的url
      // 心跳机制
      setHearTime: 10000,
      heartTimeOut: 20000,
      timeoutObj: null
    }
  },
  methods: {
    /* 心跳*/
    heartReset() {
      this.timeoutObj && clearTimeout(this.timeoutObj)
      // this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    },
    heartStart() {
      this.timeoutObj && clearTimeout(this.timeoutObj)
      this.timeoutObj = setInterval(() => {
        // console.log('发送heartCheck',this.connectSocketName)
        if (this.webSocket.readyState !== 1) {
          // 重新连接
          console.log('重新连接', this.socketReconnectNum)
          this.socketReconnect()
        } else {
          this.webSocket.send('heartCheck' + this.connectSocketName)
        }
      }, 10000)
    },
    /* websocket重新连接*/
    async socketReconnect() {
      // if(this.socketReconnectNum>7||this.lockReconnect)  {
      // socket断开后会重新连接6次
      if (this.socketReconnectNum > 5) {
        this.heartReset()
      } else {
        // console.log('socket重新连接了' + this.connectSocketName+"count"+this.socketReconnectNum)
        this.socketReconnectNum++
        this.socketConnectMixin()
      }
    },
    resetSocketData() {
      this.socketReconnectNum = 0
      // this.lockReconnect=false
    },

    /* 使用方法*/
    socketConnectMixin() {
      // console.log("socketConnectMixin被执行了",this.socketReconnectNum);
      return new Promise((resolve) => {
        if (typeof WebSocket === 'undefined') {
          console.log('遗憾：您的浏览器不支持WebSocket')
        } else {
          console.log(' new WebSocket', this.connectSocketUrl)
          this.webSocket = new WebSocket(this.connectSocketUrl)
          // 连接打开事件
          this.webSocket.onopen = () => {
            this.heartStart()
            resolve()
          }
          // 收到消息事件
          this.webSocket.onmessage = (msg) => {
            this.heartStart()
            this.resetSocketData()
            this.webSocketMessage(msg)
          }
          // 连接关闭事件
          this.webSocket.onclose = () => {
            // this.heartReset();
            // console.log('Socket发生了错误')
            // this.lockReconnect = false;
            // this.socketReconnect();
            console.log('Socket已关闭', this.connectSocketName)
          }
          // 发生了错误事件
          this.webSocket.onerror = () => {
            console.log('Socket发生了错误', this.connectSocketName)
            // this.lockReconnect = false;
            // this.socketReconnect();
          }
        }
      })
    },
    // webSocket消息监听
    webSocketMessage() {},
    // 关闭websocket连接
    webSocketClose() {
      this.webSocket.close()
      this.heartReset()
    }
  }
}
