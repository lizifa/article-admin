function makeResponse(res, httpStatus = 200, data = {}, callback) {
  res.json({
    code: httpStatus,
    data,
    message: '获取成功',
    sysTime: new Date().getTime()
  })
  callback && callback()
  return
}

module.exports = {
  makeResponse
}
