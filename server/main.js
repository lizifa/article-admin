let app = require('./app')
let useRouter = require('./router')
let { useMysql } = require('./middleware/MiddlewareMysql')

async function bootstrap() {
  await useMysql()
  await useRouter(app)
  app.listen(9000, () => {
    console.log('http://127.0.0.1:9000')
  })
}
bootstrap()
