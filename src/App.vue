<script setup>
  import usePermissionStore from '@/store/permission'
  import router from '@/router'

  const logout = () => {
    // 1. 清空 token
    localStorage.removeItem('token')
    // 2. 重置权限状态
    const permStore = usePermissionStore()
    permStore.resetPermission()
    // 3. 重置路由 (关键)
    router.replace('/login')
    // 刷新页面彻底清空路由缓存 (可选, 更稳定)
    location.reload()
  }
</script>

<template>
  <router-view />
</template>
