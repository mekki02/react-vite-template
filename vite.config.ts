import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@guards': path.resolve(__dirname, './src/guards'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
    },
  },
})
