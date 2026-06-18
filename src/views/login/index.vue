<template>
  <div>
    <el-button :disabled="!hasPerm('user:edit')" type="primary">编辑</el-button>

    <!-- 有权限才显示按钮 -->
    <el-button v-permission="'user:add'">新增用户</el-button>
    <el-button v-permission="'user:edit'">编辑用户</el-button>
    <el-button v-permission="'user:delete'">删除用户</el-button>
  </div>
</template>

<script setup>
  import { hasBtnPermission } from '@/utils/permission' // 封装权限函数
  // 封装权限函数
  const hasPerm = perm => hasBtnPermission(perm)
</script>
