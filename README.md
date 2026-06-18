# Vue 3 + Vite

这个模板应该能帮助你开始用 Vue 3 在 Vite 中开发. 模板使用 Vue 3 的 `<script setup>`
SFCs，可以查看 [脚本设置文档] (https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) 了解更多.

想了解更多关于 Vue IDE 支持的信息,
请参阅 [Vue 文档扩展指南] (https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

[//]: # (项目结构)
src/
├─ router/
│ ├─ index.js # 路由主文件 (动态路由核心)
│ └─ routes.js # 所有路由配置 (公开路由 + 私有路由)
├─ store/
│ └─ permission.js # 权限状态管理 (存储用户权限、路由)
├─ utils/
│ └─ permission.js # 权限工具函数 (筛选路由、判断权限)
└─ directive/
│ └─ permission.js # 自定义权限指令 (v-permission)
