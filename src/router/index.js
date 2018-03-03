import Vue from 'vue'
import Router from 'vue-router'
import EmGoods from 'components/EmGoods'
import EmRatings from 'components/EmRatings'
import EmSeller from 'components/EmSeller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: '商品',
      component: EmGoods
    },
    {
      path: '/ratings',
      name: '评分',
      component: EmRatings
    },
    {
      path: '/seller',
      name: '卖家',
      component: EmSeller
    }
  ]
})
