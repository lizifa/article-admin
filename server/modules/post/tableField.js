let { mysql } = require('../../middleware/MiddlewareMysql')

function tableFields(insertData) {
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
module.exports = {
  tableFields
}
