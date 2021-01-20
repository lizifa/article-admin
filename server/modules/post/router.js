let express = require('express')
let router = express.Router()
let md5 = require('md5-node')
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

// 创建帖子
router.post('/post', async (req, res) => {
  let timestamp = new Date().valueOf()
  let formData = Object.assign(req.body, {
    article_id: md5(String(timestamp)),
    create_time: timestamp
  })
  await sql.insert(formData)
  makeResponse(res, 201, {})
})

// 删除帖子
router.delete('/post/:id', (req, res) => {
  const { id } = req.params
  Joi.validate(
    req.params,
    { id: Joi.string().required() },
    async (err, value) => {
      console.log(err, value)
      await sql.delete(id)
      makeResponse(res, 205, {})
    }
  )
})

// 创建或更新帖子
router.post('/update', async (req, res) => {
  let timestamp = new Date().valueOf()
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
        .max(20)
        .required(),
      mark_content: Joi.string()
        .min(3)
        .required()
    }).validateAsync(validateFields)

    if (formData.article_id) {
      formData = Object.assign(formData, {
        update_time: timestamp
      })
      await sql.update(formData.article_id, formData)
      makeResponse(res, 201, {})
    } else {
      formData = Object.assign(formData, {
        article_id: md5(String(timestamp)),
        create_time: timestamp,
        update_time: timestamp
      })
      await sql.insert(formData)
      makeResponse(res, 201, {})
    }
  } catch (err) {
    return makeResponse(res, {
      code: 401,
      message: err.details[0]['message'] || {}
    })
  }
})

module.exports = router
