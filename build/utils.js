/**
 * @author GuangHui
 * @description 辅助函数
 */

const fs = require('fs')
const { join, basename } = require('path')

const { DIR_VIEWS } = require('./config')

const jsReg = /\.js$/
const htmlReg = /\.html?$/

const getEntries = (viewPath = DIR_VIEWS, customEntriesObj) => {
  try {
    // 获取viewPath下所有内容
    const contentList = fs.readdirSync(viewPath)

    if (!contentList.length && customEntriesObj) return customEntriesObj

    const groupByDirName = (acc, dirName) => {
      // 判断viewPath下内容类型
      const subPathOrFile = join(viewPath, dirName)
      const stat = fs.statSync(subPathOrFile)

      // 目录
      if (stat.isDirectory()) {
        // 查找二级目录内容
        const subContentList = fs.readdirSync(subPathOrFile)

        if (subContentList && subContentList.length) {
          subContentList.forEach(subDirName => {
            const entryFilePath = join(subPathOrFile, subDirName)

            // 入口文件
            if (jsReg.test(subDirName)) {
              if (acc[dirName] && acc[dirName].entry) {
                acc[dirName].entry.push(entryFilePath)
              } else {
                acc[dirName] = {
                  ...acc[dirName],
                  entry: [entryFilePath]
                }
              }
            }

            // html模板
            if (htmlReg.test(subDirName)) {
              // 只取首个html文件做为模板
              if (!acc[dirName] || !acc[dirName].template) {
                acc[dirName] = {
                  ...acc[dirName],
                  template: [entryFilePath]
                }
              }
            }
          })
        }
      } else if (stat.isFile()) {
        if (jsReg.test(dirName)) {
          const entryName = basename(dirName, '.js')

          if (acc[entryName] && acc[entryName].entry) {
            acc[entryName].entry.push(subPathOrFile)
          } else {
            acc[entryName] = {
              ...acc[entryName],
              entry: [subPathOrFile]
            }
          }
        }
      }

      return acc
    }

    const entryObj = contentList.reduce(groupByDirName, {})

    return customEntriesObj
      ? Object.assign({}, entryObj, customEntriesObj)
      : entryObj
  } catch (error) {
    if (customEntriesObj) return customEntriesObj
  }
}

module.exports = { getEntries }

// const getFileNameList = path => {
//   let fileList = []
//   let dirList = fs.readdirSync(path)
//   dirList.forEach(item => {
//     if (item.indexOf('html') > -1) {
//       fileList.push(item.split('.')[0])
//     }
//   })
//   return fileList
// }
