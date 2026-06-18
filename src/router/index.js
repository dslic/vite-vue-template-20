import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'
import usePermissionStore from '@/store/permission'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes // 初始只加载公开路由
})
// 路由守卫 (权限拦截核心)
router.beforeEach(async (to, from, next) => {
  const permStore = usePermissionStore()
  const token = localStorage.getItem('token')
  // 无 token: 直接跳登录
  if (!token) {
    to.path === '/login' ? next() : next('/login')
    return
  }

  // 有 token: 访问登录页 → 跳首页
  if (to.path === '/login') {
    next('/dashboard')
    return
  }

  // 已加载动态路由 → 直接放行
  if (permStore.loadedRoutes) {
    next()
    return
  }

  try {
    // 1. 从后端获取用户权限码
    await permStore.getPermissions()
    // 2. 生成动态路由
    const accessRoutes = permStore.generateRoutes()
    // 3. 动态添加路由到 router
    accessRoutes.forEach(route => router.addRoute(route))
    // 4. 标记路由已加载
    permStore.setLoadedRoutes(true)
    // 5. 确保路由加载完成
    next({ ...to, replace: true })
  } catch (error) {
    // 异常: 清空 token 跳登录
    localStorage.removeItem('token')
    next('/login')
  }
})

export default router
