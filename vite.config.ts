import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

// 환경 변수 로드
export default ({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [react(), svgr()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    build: {
      rollupOptions: {
        external: (id) => {
          if (id.includes('/node_modules/@mswjs')) {
            return true
          }
          if (id.includes('/src/mocks')) {
            return true
          }
        },
        manualChunks: (id) => {
          if (id.includes('/node_modules')) {
            return 'third-party-library'
          }
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_KEY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
