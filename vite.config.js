import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 按需引用zarm
    createStyleImportPlugin({
      // resolves: [zarmResolve()],
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`;
          },
        },
      ],
    }),
  ],
  css: {
    // 解决自定义样式重名问题
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        // 代理前请求为/api/userInfo，
        // 代理后为http://api.chennick.wang/api/userInfo
        // target: 'http://10.10.114.160:7001',
        target:'http://120.77.155.183:7001',
        // target:'http://127.0.0.1:7001 ',
        changeOrigin: true,
        // 匹配到/api时，把/api写为空
        //这里 写具体请求不写/api，由axios配置url同一加上/api
        //不需要rewrite
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    // 设置别名，用@ 代替src， 用utils代替src/utils
    // 引入的时候方便一些
    alias: {
      '@': path.resolve(__dirname, 'src'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
});
