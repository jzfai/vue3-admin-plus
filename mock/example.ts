export default [
  {
    url: '/getMapInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        title: 'mock请求测试'
      }
    }
  }
]
