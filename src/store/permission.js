import { defineStore } from 'pinia'
import { privateRoutes } from '@/router/routes'
import { filterRoutes } from '@/utils/permission'

export default defineStore('permission', {
  state: () => ({
    /** @type {string[]} */
    userPermissions: [], // 用户拥有的权限码 (后端返回)
    accessRoutes: [], // 用户可访问的动态路由
    loadedRoutes: false // 动态路由是否已加载
  }),
  actions: {
    // 1. 从后端获取用户权限码
    async getPermissions() {
      // 真实项目: 替换为接口请求
      const res = await fetch('/api/user/permissions')
      const data = await res.json()
      // 示例权限码: ['dashboard:view', 'user:list', 'user:add']
      this.userPermissions = data.permissions
    },

    // 2. 筛选可访问的动态路由
    generateRoutes() {
      // 根据用户权限码, 过滤私有路由
      this.accessRoutes = filterRoutes(privateRoutes, this.userPermissions)
      return this.accessRoutes
    },

    // 3. 重置权限 (退出登录时调用)
    resetPermission() {
      this.userPermissions = []
      this.accessRoutes = []
      this.loadedRoutes = false
    },

    // 4. 标记路由已加载
    setLoadedRoutes(status) {
      this.loadedRoutes = status
    }
  }
})
