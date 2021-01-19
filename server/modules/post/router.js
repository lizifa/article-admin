let express = require('express')
let router = express.Router()
let md5 = require('md5-node')
let PostModel = require('./model')
let { makeResponse } = require('../../utils')
let sql = new PostModel()
let Joi = require('joi')

const post = [
  { id: 1, name: 'book1' },
  { id: 2, name: 'book2' },
  { id: 3, name: 'book3' }
]

// 获取帖子列表
router.get('/post', async function(req, res) {
  const result = await sql.queryAll(req.query)
  makeResponse(res, {
    data: result
  })
})

// 获取某个帖子详情
router.get('/post/:id', async function(req, res) {
  let { id } = req.params
  const result = await sql.queryById(id)
  makeResponse(res, {
    data: result
  })
})

// 创建帖子
router.post('/post', async (req, res) => {
  let timestamp = new Date().valueOf()
  let formData = Object.assign(req.body, {
    article_id: md5(String(timestamp)),
    create_time: timestamp
  })
  await sql.insert(formData)
  makeResponse(res, {})
})

// 更新帖子
router.put('/post/:id', async (req, res) => {
  let book = post.find(b => b.id === parseInt(req.params.id))
  const { name } = req.body
  if (!book)
    return res.status(404).json({ msg: 'The book with the given ID not find.' })

  if (!name)
    return res
      .status(400)
      .json({ msg: '参数name不能为空~' })
      .end()

  book.name = name
  res.json(book).end()
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
      makeResponse(res, {})
    }
  )
})

// 发布帖子
router.post('/public', async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ msg: '参数name不能为空~' })
      .end()
  }

  const book = {
    id: post.length + 1,
    name
  }
  post.push(book)
  res.json(book).end()
})

// 创建或更新帖子
router.post('/update', (req, res) => {
  let timestamp = new Date().valueOf()
  let formData = req.body
  Joi.validate(
    formData,
    {
      rief_content: Joi.string()
        .min(3)
        .max(30)
        .required(),
      // .error(new Error('参数校验失败')),
      html_content: Joi.string()
        .min(3)
        .max(30)
        .required(),
      // .error(new Error('参数校验失败')),
      title: Joi.string()
        .min(3)
        .max(30)
        .required(),
      // .error(new Error('参数校验失败')),
      mark_content: Joi.string()
        .min(3)
        .max(30)
        .required()
      // .error(new Error('参数校验失败'))
    },
    async err => {
      if (err) {
        return makeResponse(res, {
          code: 401,
          message: err.details
        })
      }
      if (formData.article_id) {
        formData = Object.assign(formData, {
          update_time: timestamp
        })
        await sql.update(formData.article_id, formData)
      } else {
        formData = Object.assign(formData, {
          article_id: md5(String(timestamp)),
          create_time: timestamp,
          update_time: timestamp
        })
        await sql.insert(formData)
      }
      makeResponse(res, {})
    }
  )
})

module.exports = router
