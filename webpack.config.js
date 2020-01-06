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
  .include.add(resolve('src'))
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    cacheDirectory: true
  })

console.log(config.toString())

module.exports = config.toConfig()
