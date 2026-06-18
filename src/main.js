import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import permissionDirective from './directive/permission' // 导入纯指令对象

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .directive('permission', permissionDirective) // 👈 使用 directive 注册
  .mount('#app')
