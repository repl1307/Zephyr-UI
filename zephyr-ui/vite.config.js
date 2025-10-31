import { defineConfig } from 'vite';
import path from 'path';
import pkg from './package.json';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
      input: {
        'zephyr-ui': path.resolve(__dirname, 'src/index.js'),
        'utilities': path.resolve(__dirname, 'src/utilities/index.js'),
      },
      preserveEntrySignatures: 'exports-only',
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].es.js',
          sourcemap: true,
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs.js',
          sourcemap: true,
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
});