import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/PageHome.vue'
import ProductDetail from './pages/PageProductDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Shopmate - Home'
      }
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
        title: 'Shopmate - Detail'
      },
      props: true
    }
  ]
})
