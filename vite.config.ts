import path from "path"
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [react(), tailwindcss()],
  // define: {
  //   'process.env': process.env
  // },
  // optimizeDeps: {
  //   include: ['buffer', 'process', 'stream-browserify', 'util'],
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})