import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Zephyr-UI/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
});
