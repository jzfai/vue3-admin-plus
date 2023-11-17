//查询列表页面接口
import axiosReq from "@/utils/axios-req";

/*字典类型相关接口*/
export const listReq = (query) => {
  //查询列表
  return axiosReq({
    url: 'system/sysDictype/list',
    method: 'post',
    reqLoading: false,
    data: query
  })
}

//删除
export const deleteReq = (id) => {
  return axiosReq({
    url: `system/sysDictype/${id}`,
    method: 'delete'
  })
}

//批量删除
export const multiDeleteReq = (id) => {
  return axiosReq({
    url: `system/sysDictype/${id}`,
    method: 'delete'
  })
}

//导出
export const exportReq = (reqConfig) => {
  return axiosReq({
    url: `/system/sysDictype/export`,
    responseType: 'blob',
    method: 'post',
    params: Object.assign(reqConfig, { responseType: 'blob' })
  })
}

/**
 * 新增编辑页面接口
 *Dict新增
 */
export const addDict = (data) => {
  return axiosReq({
    url: `/system/sysDictype`,
    data,
    method: 'post'
  })
}

/**
 *Dict更新
 * @param {*} data json数据
 */
export const updateDict = (data) => {
  return axiosReq({
    url: `/system/sysDictype`,
    method: 'put',
    data
  })
}

/**
 *Dict详情
 * @param {*} id 详情id
 */
export const getDict = (id) => {
  return axiosReq({
    url: `system/sysDictype/${id}`,
    method: 'get'
  })
}

/*字典转换相关接口*/
export const dictDataReq=(dictType)=>{
  return axiosReq({
    url: '/DataDict/selectDictDataList',
    method: 'get',
    reqLoading: false,
    params: {dictType}
  })
}
