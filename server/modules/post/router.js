let express = require('express')
let router = express.Router()
let PostModel = require('./model')
let { makeResponse } = require('../../utils')
let sql = new PostModel()
let Joi = require('joi')

// 获取帖子列表
router.get('/post', async (req, res) => {
  const { code, data } = await sql.queryAll(req.query)
  makeResponse(res, code, data)
})

// 获取某个帖子详情
router.get('/post/:id', async (req, res) => {
  const { id } = req.params
  const { code, data } = await sql.queryById(id)
  makeResponse(res, code, data)
})

// 删除帖子
router.delete('/post/:id', async (req, res) => {
  const { id } = req.params
  await sql.delete(id)
  makeResponse(res, 205, {})
})

router.post('/update', async (req, res) => {
  let formData = req.body
  let validateFields = {
    rief_content: formData.rief_content,
    html_content: formData.html_content,
    title: formData.title,
    mark_content: formData.mark_content
  }

  try {
    await Joi.object({
      rief_content: Joi.string()
        .min(3)
        .required(),
      html_content: Joi.string()
        .min(3)
        .required(),
      title: Joi.string()
        .min(3)
        .max(40)
        .required(),
      mark_content: Joi.string()
        .min(3)
        .required()
    }).validateAsync(validateFields)
    if (formData.article_id) {
      await sql.update(formData.article_id, formData)
      makeResponse(res, 201)
    } else {
      await sql.insert(formData)
      makeResponse(res, 201)
    }
  } catch (e) {
    return makeResponse(res, 400, e.details[0]['message'] || {})
  }
})

module.exports = router
