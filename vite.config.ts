/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      Icons: path.resolve(__dirname, 'src/assets/icons/')
    }
  }
})
