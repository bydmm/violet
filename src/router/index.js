import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import index from '@/components/index'
import about from '@/components/about/index'
import stock from '@/components/stock/index'
import deals from '@/components/user/deals'
import orders from '@/components/user/orders'
import profile from '@/components/user/profile'
import rank from '@/components/rank/index'
import notice from '@/components/notice/index'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/stock/:code',
      name: 'stock',
      component: stock
    },
    {
      path: '/deals',
      name: 'deals',
      component: deals
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/user/orders',
      name: 'orders',
      component: orders
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
  ]
})
