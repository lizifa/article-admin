let { db } = require('../../middleware/MiddlewareMysql')
let { changeRowDataPacket } = require('../../utils')
let { tableFields } = require('./tableField')
class PostModel {
  insert(insertData) {
    return new Promise(resolve => {
      let table = tableFields(insertData)
      let insertSql = `INSERT INTO article SET rief_content = ${table.rief_content},category_id = ${table.category_id},cover_image = ${table.cover_image},edit_type = ${table.edit_type},html_content = ${table.html_content},is_english = ${table.is_english},is_gfw = ${table.is_gfw},is_original = ${table.is_original},link_url = ${table.link_url},mark_content = ${table.mark_content},tag_ids = ${table.tag_ids},title = ${table.title},article_id = ${table.article_id},create_time = ${table.create_time},update_time = ${table.update_time}`
      db.query(insertSql, (err, results) => {
        if (err) {
          resolve({ code: 400, data: err })
        } else {
          resolve({ code: 200 })
        }
      })
    })
  }
  update(id, insertData) {
    return new Promise(resolve => {
      let table = tableFields(insertData)
      let modSql = `UPDATE article SET rief_content = ${table.rief_content},category_id = ${table.category_id},cover_image = ${table.cover_image},edit_type = ${table.edit_type},html_content = ${table.html_content},is_english = ${table.is_english},is_gfw = ${table.is_gfw},is_original = ${table.is_original},link_url = ${table.link_url},mark_content = ${table.mark_content},tag_ids = ${table.tag_ids},title = ${table.title},article_id = ${table.article_id},create_time = ${table.create_time},update_time = ${table.update_time} WHERE article_id = '${id}'`
      db.query(modSql, (err, results) => {
        if (err) {
          resolve({ code: 400, data: err })
        } else {
          resolve({ code: 201, data: results })
        }
      })
    })
  }
  delete(id) {
    return new Promise(resolve => {
      let deleteSql = `DELETE FROM article WHERE article_id = '${id}' `
      db.query(deleteSql, (err, results) => {
        if (err) {
          resolve({ code: 400, data: err })
        } else {
          resolve({ code: 200 })
        }
      })
    })
  }
  queryById(id) {
    return new Promise(resolve => {
      let getSql = `SELECT * FROM article WHERE article_id = '${id}'`
      db.query(getSql, (err, results) => {
        if (err) {
          resolve({ code: 400, data: err })
        } else {
          resolve({ code: 200, data: results })
        }
      })
    })
  }
  queryAll(params) {
    return new Promise(resolve => {
      let { page, size } = params
      let querySql = `select * from article limit ${(page - 1) * size}, ${size}`
      db.query(querySql, (err, results) => {
        if (err) {
          resolve({ code: 400, data: err })
        } else {
          resolve({ code: 200, data: changeRowDataPacket(results) })
        }
      })
    })
  }
}

module.exports = PostModel
