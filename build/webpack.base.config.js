/**
 * @author GuangHui
 * @description 基础配置
 */

const Config = require('webpack-chain')
const config = new Config()

const { getViewGroup, join } = require('./utils')
const { addHtmlPlugin, addEntry } = require('./chain-utils')

const {
  DIR_SRC,
  DIR_OUTPUT,
  DIR_SASS,
  DIR_ASSETS,
  ENABLE_MULTI_ENTRY,
  SINGLE_ENTRY_PATH,
  SINGLE_TEMPLATE
} = require('./config')

if (ENABLE_MULTI_ENTRY) {
  Object.entries(getViewGroup()).forEach(([entryName, { entry, template }]) => {
    // 入口
    entry &&
      entry.length &&
      entry.forEach(en => addEntry(config, entryName, en))

    // html模板
    template &&
      template.length &&
      template.forEach(temp => addHtmlPlugin(config, entryName, temp))
  })
} else {
  addEntry(config, 'main', join(DIR_SRC, SINGLE_ENTRY_PATH))
  addHtmlPlugin(config, 'main', SINGLE_TEMPLATE)
}

// 输出
config.output.path(DIR_OUTPUT)

// 编译es
config.module
  .rule('compile-es')
  .test(/\.js$/)
  .include.add(DIR_SRC)
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
  .include.add(DIR_ASSETS)
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
  .rule('compile-scss')
  .test(/\.scss$/)
  .include.add(DIR_SASS)
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
    patterns: [join(DIR_SASS, '_var.scss'), join(DIR_SASS, '_mixins.scss')]
  })

module.exports = config
