import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // MUI core + icons (large – split so caching is efficient)
          'vendor-mui': ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
          'vendor-mui-icons': ['@mui/icons-material'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5173,
  },
})
