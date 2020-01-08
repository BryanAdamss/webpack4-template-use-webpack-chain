/**
 * @author GuangHui
 * @description 配置常量
 */

const path = require('path')
const cwd = process.cwd()

const DIR_SRC = path.resolve(cwd, 'src')
const DIR_STATIC = path.resolve(cwd, 'static')
const DIR_OUTPUT = path.resolve(cwd, 'dist')
const DIR_VIEWS = path.resolve(DIR_SRC, 'views')

module.exports = { DIR_SRC, DIR_STATIC, DIR_OUTPUT, DIR_VIEWS }
