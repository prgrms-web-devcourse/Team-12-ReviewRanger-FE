import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
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
    },
  },
})
