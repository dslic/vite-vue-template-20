import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer' // 占用分析报表, 生成 stats.html

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 使用 import.meta.url 替代 process.cwd(), 避免 Node 类型缺失报错
  const root = fileURLToPath(new URL('.', import.meta.url))
  const env = loadEnv(mode, root, '') // 加载环境变量

  return {
    base: env['VITE_SERVICE_NAME'],
    plugins: [
      vue(),
      VueDevTools({ launchEditor: '/Applications/IntelliJ IDEA.app/Contents/MacOS/idea' }),
      visualizer(),
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用压缩
        threshold: 10240, // 压缩阈值 10kb 以上才压缩
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 压缩文件后缀
        deleteOriginFile: false // 是否删除原始文件
      })
    ], // 配合 nginx 配置使用 http { gzip_static on; gzip_comp_level 2; } 1. 压缩比最小处理处理速度越快 2. 压缩比越大处理速度越慢(传输快但比较消耗 CPU)
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    esbuild: {
      // drop: ['console', 'debugger']
    },
    build: {
      // 设置构建目标以支持更广泛的浏览器
      target: ['es2015'],
      outDir: 'dist',
      assetsDir: 'assets',
      modulePreload: { polyfill: true },
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          // ✅ 显式声明 id: string, 解决 TS7044 隐式 any 报错
          manualChunks: (id: string) => {
            const staticMap: Record<string, string[]> = {
              vue: ['vue', 'vue-router'],
              axios: ['axios'],
              dayjs: ['dayjs'],
              echarts: ['echarts', 'zrender']
            }
            for (const [chunkName, modules] of Object.entries(staticMap)) {
              if (modules.some(m => id.includes(`/node_modules/${m}/`))) {
                return chunkName
              }
            }
            if (id.includes('node_modules')) return 'vendor'
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "@/assets/element/index.scss" as *;`, // CSS 文件的全局导入配置
        }
      }
    },
    server: {
      port: 8080,
      host: true,
      open: true,
      hmr: true,
      allowedHosts: ['.ngrok-free.app'],
      proxy: {
        '/api': {
          target: env['VITE_SERVICE_URL'],
          changeOrigin: true,
          // ✅ 显式声明 path: string, 解决 TS7044 隐式 any 报错
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
