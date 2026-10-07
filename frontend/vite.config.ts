import path from 'node:path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
// @ts-ignore
import handlebars from 'vite-plugin-handlebars'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

const root = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  const packageName = env.npm_package_name
  const packageNameWithoutAtSymbol = packageName.replace(/@\w*\//g, '')

  const isDevelopment = mode === 'development'
  const isPreview = mode === 'preview'
  const isStandalone = mode === 'standalone'

  return {
    define: {
      'process.env.APPINSIGHTS_CONSTRING': `"${env.APPINSIGHTS_CONSTRING}"`,
      'process.env.APP_NAME': `"${env['APP-NAME']}"`,
      'process.env.BUILD_ID': `"${env.BUILD_ID}"`,
    },

    base: '/',

    build: {
      minify: false,

      terserOptions: {
        output: {
          comments: false,
        },
      },

      outDir: 'build',

      target: 'esnext',

  
    },

    envPrefix: 'REACT_APP_',

    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      react(),

      // =========================
      // PWA CONFIG
      // =========================
      VitePWA({
        registerType: 'autoUpdate',

        injectRegister: 'auto',

        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'masked-icon.svg',
        ],

        manifest: {
          name: 'Absensi SD Warakas 01',
          short_name: 'Absensi',
          description: 'Aplikasi Absensi Siswa SD Warakas 01',

          theme_color: '#0f172a',
          background_color: '#ffffff',

          display: 'standalone',

          orientation: 'portrait',

          scope: '/',

          start_url: '/',

          lang: 'id-ID',

          icons: [
            {
              src: '/logowarakas01.jpeg',
              sizes: '192x192',
              type: 'image/png',
            },

            {
              src: '/logowarakas01.jpeg',
              sizes: '512x512',
              type: 'image/png',
            },

            {
              src: '/logowarakas01.jpeg',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },

        workbox: {
          cleanupOutdatedCaches: true,

          clientsClaim: true,

          skipWaiting: true,

          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,


          globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],

          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',

              options: {
                cacheName: 'google-fonts-cache',

                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },

                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },

            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',

              options: {
                cacheName: 'gstatic-fonts-cache',

                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },

                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },

        devOptions: {
          enabled: true,
        },
      }),

      // =========================
      // Compression
      // =========================
      viteCompression({
        algorithm: 'brotliCompress',
      }),

      // =========================
      // TS Config Paths
      // =========================
      viteTsconfigPaths(),

      // =========================
      // SVG React Component
      // =========================
      svgrPlugin(),

      // =========================
      // Local HTTPS Preview
      // =========================
      isPreview ? basicSsl() : null,
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['src'],
        },
      },
    },

    server: {
      host: true,
      port: 3000,
    },

    preview: {
      host: true,
      port: 4173,
    },
  }
})