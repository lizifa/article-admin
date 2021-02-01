let express = require('express')
let router = express.Router()
let PostModel = require('./model')
let { makeResponse } = require('../../utils')
let sql = new PostModel()
let Joi = require('joi')

// 获取帖子列表
router.get('/post', async (req, res) => {
  let { code, data } = await sql.queryAll(req.query)
  makeResponse(res, { code, data })
})

// 获取某个帖子详情
router.get('/post/:id', async (req, res) => {
  let { id } = req.params
  let { code, data } = await sql.queryById(id)
  makeResponse(res, { code, data })
})

// 删除帖子
router.delete('/post/:id', async (req, res) => {
  let { id } = req.params
  await sql.delete(id)
  makeResponse(res, { code: 205 })
})

router.post('/update', async (req, res) => {
  let formData = req.body
  try {
    await Joi.object({
      rief_content: Joi.string()
        .min(3)
        .required()
        .error(new Error('文章简介不符合验证规则')),
      title: Joi.string()
        .min(3)
        .max(50)
        .error(new Error('文章标题不符合验证规则'))
        .required(),
      mark_content: Joi.string()
        .min(3)
        .required()
        .error(new Error('文章内容不符合验证规则'))
    }).validateAsync(formData, { stripUnknown: true })
    if (formData.article_id) {
      await sql.update(formData.article_id, formData)
      makeResponse(res, { code: 201 })
    } else {
      await sql.insert(formData)
      makeResponse(res, { code: 201 })
    }
  } catch (e) {
    return makeResponse(res, { code: 400, message: e.message })
  }
})

module.exports = router
