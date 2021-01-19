import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:7000/api',
  timeout: 200000
})

axios.defaults.withCredentials = false

function requestSuccess(config) {
  return config
}

function requestFail(error) {
  Promise.reject(error)
}

function responseSuccess(response) {
  return response.data
}

function responseFail(error) {
  return Promise.reject(error)
}

service.interceptors.request.use(requestSuccess, requestFail)
service.interceptors.response.use(responseSuccess, responseFail)

export default service
