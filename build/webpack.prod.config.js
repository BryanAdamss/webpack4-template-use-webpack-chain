/**
 * @author GuangHui
 * @description 生产环境
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
MiniCssExtractPlugin.__expression = `require('mini-css-extract-plugin')`

const baseConfig = require('./webpack.base.config.js')
const { DIR_OUTPUT } = require('./config')

// 设置mode
baseConfig.mode('production')

// 生产环境使用chunkhash
baseConfig.output
  .filename('js/[name].[chunkhash:8].js')
  .chunkFilename('js/[name].[chunkhash:8].js')

// 使用MiniCssExtractPlugin提取css
baseConfig.module
  .rule('compile-css')
  .uses.delete('style') // 改用MiniCssExtractPlugin提取css
  .end()
  .use('extract-css')
  .loader(MiniCssExtractPlugin.loader)
  .before('css')
  .end()

baseConfig.module
  .rule('compile-scss')
  .uses.delete('style') // 改用MiniCssExtractPlugin提取css
  .end()
  .use('extract-css')
  .loader(MiniCssExtractPlugin.loader)
  .before('css')
  .end()

// 配置MiniCssExtractPlugin
baseConfig.plugin('extract-css').use(MiniCssExtractPlugin, [
  {
    filename: 'css/[name].[contenthash:8].css'
  }
])

baseConfig.optimization.splitChunks({
  // 对所有的包(inital+async+node_modules)进行拆分
  chunks: 'all'
})

// 提取manifest
baseConfig.optimization.runtimeChunk({
  name: 'manifest'
})

module.exports = baseConfig.toConfig()
