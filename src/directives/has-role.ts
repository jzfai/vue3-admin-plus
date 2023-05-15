import { useBasicStore } from '@/store/basic'
function checkPermission(el, { value }) {
  const superAdmin = 'admin'
  const { roles } = useBasicStore()
  if (value && Array.isArray(value) && value.length > 0) {
    const roleFlag = value

    const hasRole = roles.some((role) => {
      return superAdmin === role || roleFlag.includes(role)
    })

    if (!hasRole) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`请设置角色权限标签值`)
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
