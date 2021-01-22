function makeResponse(res, httpStatus = 200, data = {}, callback) {
  res.send({
    code: httpStatus,
    data,
    message: '获取成功',
    sysTime: new Date().getTime()
  })
  callback && callback()
}

module.exports = {
  makeResponse
}
