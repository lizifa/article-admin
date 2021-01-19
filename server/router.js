let postRouter = require('./modules/post/router')
let bodyParser = require('body-parser')
let AccessControlAllowOrigin = '*'
let AccessControlAllowHeaders = 'Accept,Content-type,x-real-url'
let AccessControlAllowMethods = 'PUT,POST,GET,DELETE,OPTIONS'

module.exports = useRouter

async function useRouter(app) {
  app.all('*', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', AccessControlAllowOrigin)
    res.set('Access-Control-Allow-Methods', AccessControlAllowMethods)
    res.set('Access-Control-Allow-Headers', AccessControlAllowHeaders)
    next()
  })
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use('/api', postRouter)
}
