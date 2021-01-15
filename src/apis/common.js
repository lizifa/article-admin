import request from "../utils/request";

export function updateAction(params) {
  return new request({
    url: "update",
    method: "post",
    data: params,
  });
}

export function publicAction(params) {
  return new request({
    url: "public",
    method: "post",
    data: params,
  });
}