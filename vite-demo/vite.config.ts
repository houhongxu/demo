import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { normalizePath } from 'vite'
import path from 'path'
import autoprefixer from 'autoprefixer'
import svgr from 'vite-plugin-svgr'
import viteImagemin from 'vite-plugin-imagemin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import testHooksPlugin from './plugins/test-hooks'
import virtual from './plugins/virtual-module'
import inspect from 'vite-plugin-inspect'

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'))

// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === 'production'
// 填入项目的 CDN 域名地址
const CDN_URL = '/'

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.join(__dirname, 'src'),  // 手动指定项目根目录位置
  plugins: [
    react(),
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')]
    }),
    // testHooksPlugin(),
    virtual(),
    inspect()
  ],

  // 域名
  base: isProduction ? CDN_URL : '/',

  resolve: {
    // 别名配置
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },

  // css 相关的配置
  css: {
    // 预处理器配置
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    // css-module配置
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: [
            'last 2 versions',
            '> 1%',
            'Chrome > 40',
            'ff > 31',
            'ie 11'
          ]
        })
      ]
    }
  },

  build: {
    // 内嵌静态资源为base64
    assetsInlineLimit: 3 * 1024 // 3 KB
  }
})
