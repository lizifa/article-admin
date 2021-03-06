const express = require('express')
const APP = express()

const MYSQL_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'lizifa',
  port: 3306,
  database: 'post',
  charset: 'utf8mb4'
}

const PORT = 7000

const ACCESSCONTROLALLOWORIGIN = 'http://localhost:8080'
const ACCESSCONTROLALLOWHEADERS = 'Accept,Content-type,x-real-url'
const ACCESSCONTROLALLOWMETHODS = 'PUT,POST,GET,DELETE,OPTIONS'

module.exports = {
  MYSQL_CONFIG,
  PORT,
  APP,
  ACCESSCONTROLALLOWORIGIN,
  ACCESSCONTROLALLOWHEADERS,
  ACCESSCONTROLALLOWMETHODS
}
