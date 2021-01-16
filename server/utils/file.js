const fs = require('fs')
const path = require('path')

/**
 * 读文件
 * */
function readFile(filePath, parseJson = false) {
  if (!filePath) {
    return ''
  }
  let str = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  })
  if (parseJson) {
    try {
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  }
  return str
}

/**
 * 写文件
 * */
async function writeFile(filePath, text = '') {
  if (filePath) {
    let dirPath = path.resolve(filePath, 'post')
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
    fs.writeFileSync('./post/post.js', text)
  }
}

/**
 * 是否存在文件
 * */
function isFileExst(filePath) {
  return fs.existsSync(filePath)
}

/**
 * 寻找配置文件
 * */
function findConfig(configFilePath, argv) {
  let configJson = {}
  if (isFileExst(configFilePath)) {
    configJson = readFile(configFilePath, true)
  }
  for (let key in argv) {
    if (key !== '_') {
      configJson[key] = argv[key]
    }
  }

  return configJson
}

/**
 * 以当前文件夹为起始的文件路径
 * */
function reloveServerPath(targetPath) {
  return path.resolve(process.cwd(), targetPath)
}

module.exports = {
  reloveServerPath,
  findConfig,
  isFileExst,
  writeFile,
  readFile
}
