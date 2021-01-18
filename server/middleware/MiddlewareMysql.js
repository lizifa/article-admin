let mysql = require('mysql')
let { mysqlConfig } = require('../config')
let db = mysql.createConnection(mysqlConfig)
async function useMysql() {
  await db.connect(err => {
    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }
    console.log('数据库已连接成功：===> connected as id ' + db.threadId)
  })
}

module.exports = { db, useMysql }
