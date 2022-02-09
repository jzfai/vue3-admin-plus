import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'

//mock
import { viteMockServe } from 'vite-plugin-mock'

//setup name
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

//auto import element-plus has some issue
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//auto import vue https://www.npmjs.com/package/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'

//  import image
//  直接使用 <img :src="Logo" />
// import ViteImages from 'vite-plugin-vue-images'
import setting from './src/settings'
// import { loadEnv } from 'vite'
const prodMock = setting.openProdMock
// import packageJson from './package.json'

/* use child_process to exec shell */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const child_process = require('child_process')
let commitHash = ''
try {
  commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim()
} catch (e) {
  throw new Error(e.toString())
}
export default ({ command, mode }) => {
  /*
   console.log(command, mode)
  * serve serve-dev
  * */
  return {
    /*
     * "/vue3-admin-plus" nginx deploy folder
     * detail to look https://vitejs.cn/config/#base
     * how to config, such as http://8.135.1.141/vue3-admin-plus/#/dashboard
     * "/vue3-admin-plus/" --> config to base is you need
     * http://8.135.1.141 --> if you config "/" , you can visit attached  to http://8.135.1.141
     * */
    base: setting.viteBasePath,
    //define global var
    define: {
      //fix "path" module issue
      'process.platform': null,
      'process.version': null,
      //define global var
      GLOBAL_VAR: {
        GIT_COMMIT_ID: commitHash
      }
    },
    clearScreen: false,
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 5006, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      //proxy look for https://vitejs.cn/config/#server-proxy
      // proxy: {
      //   '/api': {
      //     target: loadEnv(mode, process.cwd()).VITE_APP_PROXY_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    plugins: [
      vue({
        // refTransform: true // 开启ref转换 还是实验性   use example for $ref
      }),
      vueJsx(),
      // legacy({
      //   targets: ['ie >= 11'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      // }),
      viteSvgIcons({
        // config svg dir that can config multi
        iconDirs: [path.resolve(process.cwd(), 'src/icons/common'), path.resolve(process.cwd(), 'src/icons/nav-bar')],
        // appoint svg icon using mode
        symbolId: 'icon-[dir]-[name]'
      }),
      //https://github.com/anncwb/vite-plugin-mock/blob/HEAD/README.zh_CN.md
      viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: true
      }),
      VueSetupExtend(),
      //https://github.com/antfu/unplugin-auto-import/blob/HEAD/src/types.ts
      AutoImport({
        // resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          'vuex',
          'vue-router',
          {
            '@/hooks/global/useCommon': ['useCommon'],
            '@/hooks/global/useElement': ['useElement'],
            '@/hooks/global/useVueRouter': ['useVueRouter'],
            '@/utils/axiosReq': ['axiosReq']
          }
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: true //auto generation auto-imports.d.ts file
      })
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
    ],
    build: {
      // minify: 'terser',
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      //remote console.log in prod
      terserOptions: {
        //detail to look https://terser.org/docs/api-reference#compress-options
        compress: {
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true
        }
      },
      //build assets Separate
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        //remove i18n waring
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
      // why remove it , look for https://github.com/vitejs/vite/issues/6026
      // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
    },
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    optimizeDeps: {
      include: ['moment-mini']
    }
  }
}
