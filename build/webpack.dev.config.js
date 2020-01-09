/**
 * @author GuangHui
 * @description 开发环境
 */

const baseConfig = require('./webpack.base.config.js')

// 设置mode
baseConfig.mode('development')

// 开发环境不使用hash
baseConfig.output.filename('js/[name].js').chunkFilename('js/[name].js')

// 设置devtool
baseConfig.devtool('cheap-eval-source-map')

// 设置端口
baseConfig.devServer.port('8080').contentBase('./dist')

// devServer watch 忽略node_modules
baseConfig.devServer.watchOptions({
  ignored: /node_modules/
})

console.log(baseConfig.toString())

module.exports = baseConfig.toConfig()
