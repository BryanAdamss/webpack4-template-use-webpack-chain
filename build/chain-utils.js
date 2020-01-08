const HtmlWebpackPlugin = require('html-webpack-plugin')
HtmlWebpackPlugin.__expression = `require('html-webpack-plugin')`

const addHtmlPlugin = (config, entryName, { path, filename }) =>
  config.plugin('html-plugin-' + entryName).use(HtmlWebpackPlugin, [
    {
      filename,
      template: path,
      inject: true,
      chunks: [entryName]
    }
  ])

const addEntry = (config, entryName, entry) =>
  config.entry(entryName).add(entry)

module.exports = {
  addHtmlPlugin,
  addEntry
}
