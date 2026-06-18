import usePermissionStore from '@/store/permission'

/**
 * 根据用户权限筛选路由
 *
 * @param {Array<any>} routes - 所有私有路由
 * @param {Array<string>} permissions - 用户权限码
 * @returns {Array<any>} - 可访问的路由列表
 */
export function filterRoutes(routes, permissions) {
  const accessRoutes = []

  routes.forEach(route => {
    const copyRoute = { ...route }
    // 1. 判断当前路由是否有权限
    if (hasPermission(copyRoute, permissions)) {
      // 2. 递归筛选子路由
      if (copyRoute.children) {
        copyRoute.children = filterRoutes(copyRoute.children, permissions)
      }
      accessRoutes.push(copyRoute)
    }
  })

  return accessRoutes
}

/**
 * 判断单个路由是否有权限
 *
 * @param {any} route - 路由对象
 * @param {Array<string>} permissions - 用户权限码
 * @returns {boolean}
 */
function hasPermission(route, permissions) {
  // 路由没有配置权限 → 默认放行
  if (!route.meta?.permissions) return true
  // 检查用户权限是否包含路由权限 (只要有一个就放行)
  return route.meta.permissions.some(p => permissions.includes(p))
}

/**
 * 按钮权限判断 (供指令 / 函数使用)
 *
 * @param {string} perm - 按钮权限码
 * @returns {boolean}
 */
export function hasBtnPermission(perm) {
  // ⚠️ 注意: 别忘了在文件顶部导入这个 store
  const permStore = usePermissionStore()
  if (!perm) return true
  return permStore.userPermissions.includes(perm)
}
