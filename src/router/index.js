import Vue from 'vue'
import VueRouter from 'vue-router'

let routes = [
  {
    path: '/',
    name: '文章列表',
    component: () => import('@/pages/post/index'),
    meta: {
      title: '文章列表'
    }
  },
  {
    path: '/post/:id',
    name: 'update',
    component: () => import('@/pages/post/post'),
    meta: {
      title: '更新帖子'
    }
  },
  {
    path: '/post/',
    name: 'create',
    component: () => import('@/pages/post/post'),
    meta: {
      title: '发布帖子'
    }
  }
]

let router = new VueRouter({
  mode: 'history',
  routes
})

export default router
Vue.use(VueRouter)
