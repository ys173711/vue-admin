'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // 开发环境下eslint-loader保存警告，不影响正常编译
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        // target: `http://10.0.7.217:8080`,
        changeOrigin: true,
        // 不想让process.env.VUE_APP_BASE_API被传递
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    // devServer中间件处理之后执行自定义中间件
    after: require('./mock/mock-server.js')
  },
  // 配置webpack，最终会通过webpack-merge合并到webpack配置中
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name, // 配置名称，在加载多个配置时使用
    resolve: {
      alias: {
        '@': resolve('src') // 别名
      }
    }
  },
  // 通过webpack-chain链式操作webpack配置，更细粒度控制webpack内部配置
  // detail: https://cli.vuejs.org/zh/guide/webpack.html#链式操作-高级
  chainWebpack(config) { // config为webpack-chain的实例
    // 需webpack v4.6.0+ 才支持预加载和预取
    // detail: https://www.jianshu.com/p/4343f2d05c4e
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    /* config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end() */
    config.module
      .rules
      .delete('svg')
      .end()
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => { // tap是修改loader的options方法
        // false则去掉元素间的空格
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            // 非开发环境下打包生成的runtime.js非常小，gzip后只有几kb，但这个文件又经常会改变，我们每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，所以建议不要将它单独拆包，而是将它内联到我们的 index.html 之中(index.html 本来每次打包都会变)
            // 同时还支持预加载preload和预取prefetch，所以选择script-ext-html-webpack-plugin
            .plugin('ScriptExtHtmlWebpackPlugin') // 定义插件名
            .after('html') // 在html-webpack-plugin之后调用
            .use('script-ext-html-webpack-plugin', [{
            // inline的name和你 runtimeChunk的name保持一致
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({ // detail: https://webpack.js.org/plugins/split-chunks-plugin/
              chunks: 'all', // 在异步和非异步块之间也可以共享块
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // 权重需要大于libs和app，否则会被打包成libs或app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可以自定义规则
                  minChunks: 3, //  被其他文件引入的次数，默认1，适合分离 node_modules 里的第三方库
                  priority: 5,
                  reuseExistingChunk: true // cacheGroups重写继承配置，设为false不继承
                }
              }
            })
          config.optimization.runtimeChunk('single') // 创建一个运行时文件，以供所有生成的块共享
        }
      )
  }
}
