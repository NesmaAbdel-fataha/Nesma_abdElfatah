import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', 

  plugins: [react(), tailwindcss()],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react'
            if (id.includes('lucide-react')) return 'vendor-icons'
            return 'vendor'
          }
        }
      }
    }
  },

  preview: {
    port: 3000,
    open: true
  }
})
