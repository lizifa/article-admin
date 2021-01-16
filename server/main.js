const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const AccessControlAllowOrigin = '*'
const AccessControlAllowHeaders = 'Accept,Content-type,x-real-url'
const AccessControlAllowMethods = 'PUT,POST,GET,DELETE,OPTIONS'
const { writeFile } = require('./utils/file')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', AccessControlAllowOrigin)
  res.set('Access-Control-Allow-Methods', AccessControlAllowMethods)
  res.set('Access-Control-Allow-Headers', AccessControlAllowHeaders)
  next()
})

app.post('/update', async (req, res) => {
  await writeFile(
    process.cwd(),
    'export const data =' + JSON.stringify(req.body)
  )
  res.send({
    code: 200,
    sysTime: new Date().getTime()
  })
})

app.post('/public', function(req, res) {
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})
