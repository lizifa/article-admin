import axios from "axios";

const service = axios.create({
  baseURL: "http://127.0.0.1:3000/",
  timeout: 200000,
});

function requestSuccess(config) {
  config.headers["x-real-url"] = window.location.href; // 携带url,用于鉴权
  console.log(config);
  return config;
}

function requestFail(error) {
  Promise.reject(error);
}

function responseSuccess(response) {
  return response.data;
}

function responseFail(error) {
  return Promise.reject(error);
}

service.interceptors.request.use(requestSuccess, requestFail);
service.interceptors.response.use(responseSuccess, responseFail);

export default service;
