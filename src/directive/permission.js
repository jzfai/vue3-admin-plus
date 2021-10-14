import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const roles = store.state.user.roles

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

//vue2和vue3中指令对比https://jishuin.proginn.com/p/763bfbd29cb7
export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  componentUpdated(el, binding) {
    checkPermission(el, binding)
  }
}
