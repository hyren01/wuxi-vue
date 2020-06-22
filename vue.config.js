module.exports = {
  // // 基本路径
  // publicPath: './',
  // // 输出文件目录
  // outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  // lintOnSave: true,
  // // use the full build with in-browser compiler?
  // // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // // webpack配置
  // // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

  //编译时报错 entrypoint size limit，解决办法：在vue.config.js文件中添加该配置
  chainWebpack: config => {
    config.performance.set('hints', false)
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  // // vue-loader 配置项
  // // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: true,
  // // css相关配置
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  //   // 开启 CSS source maps?
  //   sourceMap: false,
  //   // css预设器配置项
  //   loaderOptions: {},
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false
  // },
  // // use thread-loader for babel & TS in production build
  // // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1,
  // // 是否启用dll
  // // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // // PWA 插件相关配置
  // // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},
  // // webpack-dev-server 相关配置
  devServer: {
    // 10.1.20.2:8080
    port: 8081,
    proxy: {
      '/ywsjglprj': {
        target: 'http://101.1.236.202:18443',
        changeOrigin: true
      },
      '/stdglprj': {
        //target: 'http://139.9.126.19:8083',
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      },
      '/cms': {
        //target: 'http://172.16.45.227:9000', // 6a
        target: 'http://172.16.35.250:9000', // x86
        changeOrigin: true
      },
      '/usmm': {
        target: 'http://101.1.236.96:8288/',
        pathRewrite: { '^/usmm': '' }
        // changeOrigin: true
      }
    }
  },
  productionSourceMap: false
  // // 第三方插件配置
  // pluginOptions: {
  //   // ...
  // }
}
