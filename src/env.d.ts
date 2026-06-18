import 'vue'

declare module 'vue' {
  export interface GlobalDirectives {
    // 告诉 IDEA: 全局存在一个名为 vPermission 的指令
    vPermission: import('./directive/permission').default
  }
}
