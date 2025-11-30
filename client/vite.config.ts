import react from '@vitejs/plugin-react';
// @ts-ignore
import path from 'path';
// @ts-ignore
import type { Plugin } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command, mode }) => {
  // 加载环境变量（从项目根目录）
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '');
  
  // 获取后端端口配置
  const backendPort = env.BACKEND_PORT ? Number(env.BACKEND_PORT) : 3080;
  const backendURL = env.HOST ? `http://${env.HOST}:${backendPort}` : `http://localhost:${backendPort}`;

  // 获取前端端口配置（支持 VITE_PORT 和 PORT 环境变量）
  const frontendPort = env.VITE_PORT ? Number(env.VITE_PORT) : (env.PORT ? Number(env.PORT) : 3090);

  return {
  base: '',
  server: {
    allowedHosts: env.VITE_ALLOWED_HOSTS && env.VITE_ALLOWED_HOSTS.split(',') || [],
    host: env.HOST || 'localhost',
    port: frontendPort,
    strictPort: true, // 设置为 true，如果端口被占用会报错而不是自动切换
    proxy: {
      '/api': {
        target: backendURL,
        changeOrigin: true,
      },
      '/oauth': {
        target: backendURL,
        changeOrigin: true,
      },
    },
  },
  // Set the directory where environment variables are loaded from and restrict prefixes
  envDir: '../',
  envPrefix: ['VITE_', 'SCRIPT_', 'DOMAIN_', 'ALLOW_'],
  plugins: [
    react(),
    nodePolyfills(),
    VitePWA({
      injectRegister: 'auto', // 'auto' | 'manual' | 'disabled'
      registerType: 'autoUpdate', // 'prompt' | 'autoUpdate'
      devOptions: {
        enabled: false, // disable service worker registration in development mode
      },
      useCredentials: true,
      includeManifestIcons: false,
      workbox: {
        globPatterns: [
          '**/*.{js,css,html}',
          'assets/favicon*.png',
          'assets/icon-*.png',
          'assets/apple-touch-icon*.png',
          'assets/maskable-icon.png',
          'manifest.webmanifest',
        ],
        globIgnores: ['images/**/*', '**/*.map', 'index.html'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallbackDenylist: [/^\/oauth/, /^\/api/],
      },
      includeAssets: [],
      manifest: {
        name: 'AI朋友圈',
        short_name: 'AI朋友圈',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#009688',
        icons: [
          {
            src: 'assets/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'assets/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'assets/apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'assets/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    sourcemapExclude({ excludeNodeModules: true }) as Plugin,
    compression({
      threshold: 10240,
    }),
  ],
  publicDir: './public',
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    outDir: './dist',
    minify: 'terser',
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      output: {
        manualChunks(id: string) {
          const normalizedId = id.replace(/\\/g, '/');
          if (normalizedId.includes('node_modules')) {
            // High-impact chunking for large libraries
            if (normalizedId.includes('@codesandbox/sandpack')) {
              return 'sandpack';
            }
            if (normalizedId.includes('react-virtualized')) {
              return 'virtualization';
            }
            if (normalizedId.includes('i18next') || normalizedId.includes('react-i18next')) {
              return 'i18n';
            }
            if (normalizedId.includes('lodash')) {
              return 'utilities';
            }
            if (normalizedId.includes('date-fns')) {
              return 'date-utils';
            }
            if (normalizedId.includes('@dicebear')) {
              return 'avatars';
            }
            if (normalizedId.includes('react-dnd') || normalizedId.includes('react-flip-toolkit')) {
              return 'react-interactions';
            }
            if (normalizedId.includes('react-hook-form')) {
              return 'forms';
            }
            if (normalizedId.includes('react-router-dom')) {
              return 'routing';
            }
            if (
              normalizedId.includes('qrcode.react') ||
              normalizedId.includes('@marsidev/react-turnstile')
            ) {
              return 'security-ui';
            }

            if (normalizedId.includes('@codemirror/view')) {
              return 'codemirror-view';
            }
            if (normalizedId.includes('@codemirror/state')) {
              return 'codemirror-state';
            }
            if (normalizedId.includes('@codemirror/language')) {
              return 'codemirror-language';
            }
            if (normalizedId.includes('@codemirror')) {
              return 'codemirror-core';
            }

            if (
              normalizedId.includes('react-markdown') ||
              normalizedId.includes('remark-') ||
              normalizedId.includes('rehype-')
            ) {
              return 'markdown-processing';
            }
            if (normalizedId.includes('monaco-editor') || normalizedId.includes('@monaco-editor')) {
              return 'code-editor';
            }
            if (normalizedId.includes('react-window') || normalizedId.includes('react-virtual')) {
              return 'virtualization';
            }
            if (
              normalizedId.includes('zod') ||
              normalizedId.includes('yup') ||
              normalizedId.includes('joi')
            ) {
              return 'validation';
            }
            if (
              normalizedId.includes('axios') ||
              normalizedId.includes('ky') ||
              normalizedId.includes('fetch')
            ) {
              return 'http-client';
            }
            if (
              normalizedId.includes('react-spring') ||
              normalizedId.includes('react-transition-group')
            ) {
              return 'animations';
            }
            if (normalizedId.includes('react-select') || normalizedId.includes('downshift')) {
              return 'advanced-inputs';
            }
            if (normalizedId.includes('heic-to')) {
              return 'heic-converter';
            }

            // Existing chunks
            if (normalizedId.includes('@radix-ui')) {
              return 'radix-ui';
            }
            if (normalizedId.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (normalizedId.includes('node_modules/highlight.js')) {
              return 'markdown_highlight';
            }
            if (normalizedId.includes('katex') || normalizedId.includes('node_modules/katex')) {
              return 'math-katex';
            }
            if (normalizedId.includes('node_modules/hast-util-raw')) {
              return 'markdown_large';
            }
            if (normalizedId.includes('@tanstack')) {
              return 'tanstack-vendor';
            }
            if (normalizedId.includes('@headlessui')) {
              return 'headlessui';
            }

            // Everything else falls into a generic vendor chunk.
            return 'vendor';
          }
          // Create a separate chunk for all locale files under src/locales.
          if (normalizedId.includes('/src/locales/')) {
            return 'locales';
          }
          // Let Rollup decide automatically for any other files.
          return null;
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.[0] && /\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.names[0])) {
            return 'assets/fonts/[name][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
      /**
       * Ignore "use client" warning since we are not using SSR
       * @see {@link https://github.com/TanStack/query/pull/5161#issuecomment-1477389761 Preserve 'use client' directives TanStack/query#5161}
       */
      onwarn(warning, warn) {
        if (warning.message.includes('Error when using sourcemap')) {
          return;
        }
        warn(warning);
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src/'),
      $fonts: path.resolve(__dirname, 'public/fonts'),
      'micromark-extension-math': 'micromark-extension-llm-math',
    },
  },
  };
});

interface SourcemapExclude {
  excludeNodeModules?: boolean;
}

export function sourcemapExclude(opts?: SourcemapExclude): Plugin {
  return {
    name: 'sourcemap-exclude',
    transform(code: string, id: string) {
      if (opts?.excludeNodeModules && id.includes('node_modules')) {
        return {
          code,
          // https://github.com/rollup/rollup/blob/master/docs/plugin-development/index.md#source-code-transformations
          map: { mappings: '' },
        };
      }
    },
  };
}
