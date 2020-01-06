const path = require('path')
const Config = require('webpack-chain')
const config = new Config()

const resolve = p => path.join(__dirname, p)

// 出入口
config
  .entry('main')
  .add('./src/main.js')
  .end()
  .output.path(resolve('dist'))
  .filename('[name].[chunkhash:8].js')
  .chunkFilename('[name].[chunkhash:8].js')

// compile-es
config.module
  .rule('compile-es')
  .test(/\.js$/)
  .include.add(resolve('./src'))
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    cacheDirectory: true
  })

// 编译css
config.module
  .rule('compile-css')
  .test(/\.css$/)
  .include.add(resolve('./src/assets'))
  .end()
  .use('style')
  .loader('style-loader')
  .end()
  .use('css')
  .loader('css-loader')
  .end()
  .use('postcss')
  .loader('postcss-loader')

// 编译scss
config.module
  .rule('compile-sass')
  .test(/\.scss$/)
  .include.add(resolve('./src/assets/sass'))
  .end()
  .use('style')
  .loader('style-loader')
  .end()
  .use('css')
  .loader('css-loader')
  .end()
  .use('postcss')
  .loader('postcss-loader')
  .end()
  .use('sass')
  .loader('sass-loader')
  .end()
  .use('style-resource')
  .loader('style-resources-loader')
  .options({
    patterns: [
      resolve('./src/assets/sass/_var.scss'),
      resolve('./src/assets/sass/_mixins.scss')
    ]
  })

console.log(config.toString())

module.exports = config.toConfig()
