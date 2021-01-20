import request from '../utils/request'

export function updateAction(params) {
  return request({
    url: 'update',
    method: 'post',
    data: params
  })
}

export function publicAction(params) {
  return request({
    url: 'public',
    method: 'post',
    data: params
  })
}

export function getListAction(params) {
  return request({
    url: 'post',
    method: 'get',
    params: params
  })
}

export function getArticle(params) {
  return request({
    url: `post/${params.id}`,
    method: 'get'
  })
}

export function deleteArticle(params) {
  return request({
    url: `post/${params.article_id}`,
    method: 'delete'
  })
}
