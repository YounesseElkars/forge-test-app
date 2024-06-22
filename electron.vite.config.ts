import { sentryVitePlugin } from '@sentry/vite-plugin';
import { resolve } from 'path';
import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      bytecodePlugin(),
      sentryVitePlugin({
        org: 'myresa',
        project: 'electron',
      }),
    ],
    build: {
      sourcemap: true,
    },
  },

  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },

  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [
      react(),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'myresa',
        project: 'electron',
        reactComponentAnnotation: { enabled: true },
      }),
    ],
    build: {
      sourcemap: true,
    },
  },
});
