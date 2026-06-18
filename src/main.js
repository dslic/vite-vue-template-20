import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import permissionDirective from './directive/permission'

const app = createApp(App)
app.use(createPinia()).use(router).use(permissionDirective).mount('#app')
