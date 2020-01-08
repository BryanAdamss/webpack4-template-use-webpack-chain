/**
 * @author GuangHui
 * @description 生产环境
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
MiniCssExtractPlugin.__expression = `require('mini-css-extract-plugin')`

const baseConfig = require('./webpack.base.config.js')
const { DIR_ASSETS } = require('./config')

baseConfig.mode('production')

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

console.log(baseConfig.toString())

module.exports = baseConfig.toConfig()
