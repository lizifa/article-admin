let { db } = require('../middleware/MiddlewareMysql')
function transformData(insertData) {
  return {
    rief_content: insertData.rief_content,
    category_id: insertData.category_id,
    cover_image: insertData.cover_image,
    edit_type: insertData.edit_type,
    html_content: insertData.html_content,
    is_english: insertData.is_english,
    is_gfw: insertData.is_gfw,
    is_original: insertData.is_original,
    link_url: insertData.link_url,
    mark_content: insertData.mark_content,
    tag_ids: insertData.tag_ids,
    title: insertData.title,
    article_id: insertData.article_id,
    create_time: insertData.create_time,
    update_time: insertData.update_time
  }
}

class PostModel {
  async insert(insertData) {
    return new Promise((resolve, reject) => {
      let tableFields = transformData(insertData)
      let insertKeys = []
      let addSqlParams = []
      Object.entries(tableFields).map(arr => {
        insertKeys.push(arr[0])
        addSqlParams.push(arr[1])
      })
      let insertSql = `INSERT INTO article (${insertKeys.toString()}) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
      db.query(insertSql, addSqlParams, async (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
  async update(id, insertData) {
    return new Promise((resolve, reject) => {
      let tableFields = transformData(insertData)
      let modSql = `
        UPDATE article SET 
        rief_content = '${tableFields.rief_content}',
        category_id = '${tableFields.category_id}',
        cover_image = '${tableFields.cover_image}',
        edit_type = '${tableFields.edit_type}',
        html_content = '${tableFields.html_content}',
        is_english = '${tableFields.is_english}',
        is_gfw = '${tableFields.is_gfw}',
        is_original = '${tableFields.is_original}',
        link_url = '${tableFields.link_url}',
        mark_content = '${tableFields.mark_content}',
        tag_ids = '${tableFields.tag_ids}',
        title = '${tableFields.title}',
        article_id = '${tableFields.article_id}',
        create_time = '${tableFields.create_time}',
        update_time = '${tableFields.update_time}'
        WHERE article_id = '${tableFields.article_id}'`
      db.query(modSql, async (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
  async delete(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM article WHERE article_id = '${id}' `,
        async (err, results) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        }
      )
    })
  }
  async queryById(id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM article WHERE article_id = '${id}'`
      db.query(sql, async (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results)
        }
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
          } else {
            resolve(results)
          }
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
