import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 10001,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/tests/unit/**/*.test.ts'],
  },
})
