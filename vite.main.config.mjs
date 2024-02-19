import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/main',
      fileName: 'main', // is this right? I changed the name, so double check
    },
  },
  resolve: {
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
});
