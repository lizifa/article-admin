let mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'lizifa',
  port: 3306,
  database: 'post'
}

let PORT = 7000

let express = require('express')
let APP = express()

let ACCESSCONTROLALLOWORIGIN = '*'
let ACCESSCONTROLALLOWHEADERS = 'Accept,Content-type,x-real-url'
let ACCESSCONTROLALLOWMETHODS = 'PUT,POST,GET,DELETE,OPTIONS'

module.exports = {
  mysqlConfig,
  PORT,
  APP,
  ACCESSCONTROLALLOWORIGIN,
  ACCESSCONTROLALLOWHEADERS,
  ACCESSCONTROLALLOWMETHODS
}
