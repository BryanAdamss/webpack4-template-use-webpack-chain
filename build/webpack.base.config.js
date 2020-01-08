/**
 * @author GuangHui
 * @description 基础配置
 */

const Config = require('webpack-chain')
const config = new Config()

const { getEntries } = require('./utils')

Object.entries(getEntries()).forEach(([entryName, { template, entry }]) => {})

module.exports = config
