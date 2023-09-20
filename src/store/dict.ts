/*数据字典*/
import { defineStore } from 'pinia'
const useDictStore = defineStore('dict', {
  state: () => ({
    dict: {}
  }),
  actions: {
    // 获取字典
    getDict(_key) {
      return this.dict[_key]||[]
    },
    // 设置字典
    setDict(_key, value) {
      this.dict[_key]=value
    },
    // 删除字典
    deleteDict(_key) {
      this.dict[_key]=[]
    },
    // 清空字典
    cleanDict() {
      this.dict ={}
    },
  },
  // persist: {
  //   storage: localStorage,
  //   paths: ['dict']
  // },
})
export default useDictStore
