function makeResponse(res, data, callback) {
  let defaultResponse = {
    code: 0,
    data: null,
    message: '获取成功',
    sysTime: new Date().getTime()
  }
  let response = Object.assign(defaultResponse, data)
  res.send(response)
  callback && callback()
}

module.exports = {
  makeResponse
}
