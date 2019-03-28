import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/user.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('./views/news.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./views/order.vue')
    },
    {
      path: '/cate',
      name: 'cate',
      component: () => import('./views/cate.vue')
    }
  ]
})
