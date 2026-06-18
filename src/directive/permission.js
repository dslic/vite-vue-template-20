import { hasBtnPermission } from '@/utils/permission'

export default {
  install(app) {
    // 注册全局指令 v-permission
    app.directive('permission', {
      mounted(el, binding) {
        // 无权限 → 直接移除按钮
        if (!hasBtnPermission(binding.value)) {
          el.parentNode?.removeChild(el)
        }
      }
    })
  }
}
