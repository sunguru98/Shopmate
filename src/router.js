import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/PageHome.vue'
import About from './pages/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Shopmate - Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: 'Shopmate - Home'
      }
    }
  ]
})
