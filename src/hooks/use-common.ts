//复制文本
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'

// i18n language  match title
import { i18n } from '@/lang'
// the keys using  zh file
import langEn from '@/lang/zh'
import settings from '@/settings'

export const sleepTimeout = (time) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(null)
    }, time)
  })
}

export const filterNull = (data) => {
  Object.keys(data).forEach((key) => {
    if (!data[key]) delete data[key]
  })

  return data
}

//深拷贝
export function cloneDeep(value) {
  return JSON.parse(JSON.stringify(value))
}

//copyValueToClipboard
const { toClipboard } = useClipboard()
export const copyValueToClipboard = (value) => {
  toClipboard(JSON.stringify(value))
  ElMessage.success('复制成功')
}
const { t, te } = i18n.global
export const langTitle = (title) => {
  if (!title) {
    return settings.title
  }
  for (const key of Object.keys(langEn)) {
    if (te(`${key}.${title}`) && t(`${key}.${title}`)) {
      return t(`${key}.${title}`)
    }
  }

  return title
}

//get i18n instance
export const getLangInstance = () => {
  return i18n.global
}

//生成唯一的uuid
export const getGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.trunc(Math.random() * 16)
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

//根据url下载模板
export const downLoadTempByUrl = (url) => {
  //得到主键key
  const link = document.createElement('a')
  link.href = url
  document.body.appendChild(link)
  link.click()
}

//下载模板
export const downLoadTemp = (res) => {
  //得到主键key
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', decodeURI(res.headers['file-name']))
  document.body.appendChild(link)
  link.click()
}

//下载模板
export const downLoadTempByApi = (reqConfig) => {
  axiosReq(Object.assign(reqConfig, { responseType: 'blob' })).then((res) => {
    downLoadTemp(res)
  })
}

export const resetData = (from, formString) => {
  const backData = JSON.parse(formString)
  Object.keys(backData).forEach((key) => (from[key] = backData[key]))
}

export const reshowData = (addEditForm, detailData) => {
  Object.keys(addEditForm).forEach((fItem) => {
    // eslint-disable-next-line no-prototype-builtins
    if (detailData && ![null, undefined, ''].includes(detailData[fItem])) {
      addEditForm[fItem] = detailData[fItem]
    }
  })
}
