import { hasBtnPermission } from '@/utils/permission'

const permissionDirective = {
  mounted(el, binding) {
    // 无权限 → 直接移除按钮
    if (!hasBtnPermission(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  }
}

export default permissionDirective
