// 无需权限, 所有人都能访问 (登录、404等)
export const publicRoutes = [
  { path: '/login', component: () => import('@/views/login/index.vue'), hidden: true },
  { path: '/404', component: () => import('@/views/404/index.vue'), hidden: true }
]

// 需要权限控制的私有路由 (核心: 给路由添加 permissions/roles 字段)
export const privateRoutes = [
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    name: 'Dashboard',
    meta: {
      title: '首页',
      permissions: ['dashboard:view'] // 权限码 (后端返回)
    }
  },
  {
    path: '/user',
    component: () => import('@/views/user/index.vue'),
    name: 'User',
    meta: {
      title: '用户管理',
      permissions: ['user:list', 'user:add', 'user:edit', 'user:delete'] // 多个权限
    }
  },
  {
    path: '/order',
    component: () => import('@/views/order/index.vue'),
    name: 'Order',
    meta: { title: '订单管理', permissions: ['order:list'] }
  }
]

// 初始化路由 (公开路由 + 404 重定向)
export const constantRoutes = [
  ...publicRoutes,
  { path: '/', redirect: '/dashboard', hidden: true },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]
