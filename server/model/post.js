let { db } = require('../middleware/MiddlewareMysql')
class PostModel {
  async insert(insertData) {
    return new Promise((resolve, reject) => {
      let keys = []
      let values = []
      Object.entries(insertData).map(arr => {
        keys.push(arr[0])
        values.push(arr[1])
      })
      let sql = `INSERT INTO article(${String(
        keys
      )}) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
      db.query(sql, values, async (err, results) => {
        if (err) {
          reject(err)
        }
        resolve(results)
      })
    })
  }
  async update(id, insertData) {
    return new Promise((resolve, reject) => {
      let keysString = ''
      let values = []
      Object.entries(insertData).map(arr => {
        keysString += arr[0] + '= ?,'
        values.push(arr[1])
      })
      keysString = keysString.slice(0, -1)
      let sql = `UPDATE article SET ${keysString} WHERE article_id = '${id}'`
      console.log(sql)
      db.query(sql, values, async (err, results) => {
        if (err) {
          reject(err)
        }
        resolve(results)
      })
    })
  }
  async delete(id) {
    return new Promise(resolve => {
      db.query(`DELETE FROM article WHERE id=${id}`, async (err, results) => {
        if (err) {
          resolve(err)
        }
        resolve(results)
      })
    })
  }
  async queryById(id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM article WHERE article_id = '${id}'`
      db.query(sql, async (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(results)
      })
    })
  }
  async queryAll(params) {
    return new Promise(resolve => {
      let { page, size } = params
      db.query(
        `select * from article limit ${(page - 1) * size}, ${size}`,
        async (err, results) => {
          if (err) {
            resolve(err)
          }
          resolve(results)
        }
      )
    })
  }
  async queryByarticleName({ articleName = '', articlePassword = '' }) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM article WHERE article_name = '${articleName}' AND password = '${articlePassword}'`
      db.query(sql, async (err, results) => {
        if (err) {
          reject(err)
        }
        resolve(results)
      })
    })
  }
}

module.exports = PostModel
