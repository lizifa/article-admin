let { db } = require('../../middleware/MiddlewareMysql')
let { createSql } = require('./fileds')

class PostModel {
  insert(insertData) {
    return new Promise((resolve, reject) => {
      db.query(createSql(insertData, { type: 'insert' }), err => {
        if (err) {
          reject({ code: 400, data: err })
        } else {
          resolve({ code: 201 })
        }
      })
    })
  }
  update(id, insertData) {
    return new Promise((resolve, reject) => {
      db.query(
        createSql(insertData, { type: 'update', id }),
        (err, results) => {
          if (err) {
            reject({ code: 400, data: '参数错误~' })
          } else {
            resolve({ code: 201, data: results })
          }
        }
      )
    })
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      db.query(createSql({}, { type: 'delete', id }), err => {
        if (err) {
          reject({ code: 400, data: err })
        } else {
          resolve({ code: 200 })
        }
      })
    })
  }
  queryById(id) {
    return new Promise((resolve, reject) => {
      db.query(createSql({}, { type: 'select', id }), (err, results) => {
        if (err) {
          reject({ code: 400, data: err })
        } else {
          resolve({ code: 200, data: results })
        }
      })
    })
  }
  queryAll(params) {
    return new Promise((resolve, reject) => {
      let { page, size } = params
      let querySql = `select * from article ORDER BY id DESC limit ${(page -
        1) *
        size}, ${size}`
      db.query(querySql, (err, results) => {
        if (err) {
          reject({ code: 400, data: err })
        } else {
          resolve({ code: 200, data: JSON.parse(JSON.stringify(results)) })
        }
      })
    })
  }
}

module.exports = PostModel
