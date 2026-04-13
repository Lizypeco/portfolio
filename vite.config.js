import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 核心修复：确保部署到 GitHub Pages 的 /portfolio/ 路径下
  base: '/portfolio/', 
  build: {
    // 确保打包到 dist 目录
    outDir: 'dist',
  }
})