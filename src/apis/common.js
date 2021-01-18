import request from '../utils/request'

export function updateAction(params) {
  return new request({
    url: 'update',
    method: 'post',
    data: params
  })
}

export function publicAction(params) {
  return new request({
    url: 'public',
    method: 'post',
    data: params
  })
}

export function getListAction(params) {
  return new request({
    url: 'post',
    method: 'get',
    params: params
  })
}

export function getArticle(params) {
  return new request({
    url: `post/${params.article_id}`,
    method: 'get'
  })
}

export function deleteArticle(params) {
  return new request({
    url: `post/${params.article_id}`,
    method: 'delete'
  })
}
