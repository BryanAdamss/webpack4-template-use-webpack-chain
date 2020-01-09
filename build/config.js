/**
 * @author GuangHui
 * @description 配置常量
 */

const { join } = require('path')
const cwd = process.cwd()

const DIR_SRC = join(cwd, 'src')
const DIR_STATIC = join(cwd, 'static')
const DIR_OUTPUT = join(cwd, 'dist')

const DIR_VIEWS = join(DIR_SRC, 'views')
const DIR_ASSETS = join(DIR_SRC, 'assets')
const DIR_SASS = join(DIR_SRC, 'sass')

const ENABLE_MULTI_ENTRY = true // 是否启用多入口

const SINGLE_ENTRY_PATH = './single-entry.js' // 单入口
const SINGLE_TEMPLATE = {
  path: join(cwd, './index.html'), // 单入口的模板
  filename: 'index.html' // 单入口的html文件名
}

module.exports = {
  DIR_SRC,
  DIR_STATIC,
  DIR_OUTPUT,
  DIR_VIEWS,
  DIR_ASSETS,
  DIR_SASS,
  ENABLE_MULTI_ENTRY,
  SINGLE_ENTRY_PATH,
  SINGLE_TEMPLATE
}
