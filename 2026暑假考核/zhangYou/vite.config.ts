import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{open:true},
   resolve:{
    alias:{
      // 配置路径别名，方便导入
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
