import { useBasicStore } from '@/store/basic'
function checkPermission(el, { value }) {
  const { permission } = useBasicStore()
  const allPermission = '*:*:*'
  if (value && Array.isArray(value) && value.length > 0) {
    const permissionFlag = value
    const hasPermissions = permission.some((permission) => {
      return allPermission === permission || permissionFlag.includes(permission)
    })
    if (!hasPermissions) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`请设置操作权限标签值`)
  }
}
export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  componentUpdated(el, binding) {
    checkPermission(el, binding)
  }
}
