//复制文本
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'

export const sleepTimeout = (time: number) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(null)
    }, time)
  })
}

//深拷贝
export function cloneDeep(value) {
  return JSON.parse(JSON.stringify(value))
}

const { toClipboard } = useClipboard()
export const copyValueToClipboard = (value: any) => {
  toClipboard(JSON.stringify(value))
  ElMessage.success('复制成功')
}

// i18n language  match title
import { i18n } from '@/lang'
const { t, te } = i18n.global
import langEn from '@/lang/en'
export const langTitle = (title) => {
  for (const key of Object.keys(langEn)) {
    if (te(`${key}.${title}`) && t(`${key}.${title}`)) {
      return t(`${key}.${title}`)
    }
  }
  return title
}
