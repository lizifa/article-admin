let { mysql } = require('../../middleware/MiddlewareMysql')

function fields(insertData) {
  let data = {
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

  Object.keys(data).forEach(key => {
    data[key] = mysql.escape(insertData[key])
  })
  return data
}
function createSql(data, options) {
  let table = fields(data)
  let sql = ''
  switch (options.type) {
    case 'insert':
      sql = `INSERT INTO article SET rief_content = ${table.rief_content},category_id = ${table.category_id},cover_image = ${table.cover_image},edit_type = ${table.edit_type},html_content = ${table.html_content},is_english = ${table.is_english},is_gfw = ${table.is_gfw},is_original = ${table.is_original},link_url = ${table.link_url},mark_content = ${table.mark_content},tag_ids = ${table.tag_ids},title = ${table.title},article_id = ${table.article_id},create_time = ${table.create_time},update_time = ${table.update_time}`
      break
    case 'update':
      sql = `UPDATE article SET rief_content = ${table.rief_content},category_id = ${table.category_id},cover_image = ${table.cover_image},edit_type = ${table.edit_type},html_content = ${table.html_content},is_english = ${table.is_english},is_gfw = ${table.is_gfw},is_original = ${table.is_original},link_url = ${table.link_url},mark_content = ${table.mark_content},tag_ids = ${table.tag_ids},title = ${table.title},article_id = ${table.article_id},create_time = ${table.create_time},update_time = ${table.update_time} WHERE article_id = '${options.id}'`
      break
    case 'delete':
      sql = `DELETE FROM article WHERE article_id = '${options.id}' `
      break
    case 'select':
      sql = `SELECT * FROM article WHERE article_id = '${options.id}'`
      break
  }
  return sql
}

module.exports = {
  fields,
  createSql
}
