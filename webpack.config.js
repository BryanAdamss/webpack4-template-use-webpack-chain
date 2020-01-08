const path = require('path')
const Config = require('webpack-chain')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
MiniCssExtractPlugin.__expression = `require('mini-css-extract-plugin')`

console.log(process.env.NODE_ENV)
const mode = process.env.NODE_ENV
const devMode = mode !== 'production'

const config = new Config()

const resolve = p => path.join(__dirname, p)
const resolveModule = name => require.resolve(name)

const useStyleLoader = config => config.use('style').loader('style-loader')
const useExtractCssLoader = config =>
  config.use('extract-css').loader(MiniCssExtractPlugin.loader)

// 设置mode
config.mode(mode)

// 出入口
config
  .entry('main')
  .add('./src/main.js')
  .end()
  .output.path(resolve('dist'))
  .filename('js/[name].[chunkhash:8].js')
  .chunkFilename('js/[name].[chunkhash:8].js')

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
  .when(devMode, useStyleLoader, useExtractCssLoader)
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
  .when(devMode, useStyleLoader, useExtractCssLoader)
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

// 添加html-webpack-plugin插件
config.plugin('html').use(resolveModule('html-webpack-plugin'), [
  {
    filename: 'index.html',
    template: 'index.html',
    inject: true
  }
])

// 添加mini-css-extract-plugin插件
config.plugin('extract-css').use(MiniCssExtractPlugin, [
  {
    filename: 'css/[name].[contenthash:8].css'
  }
])

console.log(config.toString())

module.exports = config.toConfig()
